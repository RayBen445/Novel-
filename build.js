#!/usr/bin/env node

/**
 * Build script for Novel Weaver
 * Processes index.html and substitutes Firebase config environment variables
 */

const fs = require('fs');
const path = require('path');

const INPUT_FILE = 'index.html';
const OUTPUT_DIR = 'dist';
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'index.html');

// Firebase config environment variables with fallback values
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || "AIzaSyDkunqQ55PRMY8rNcQ3gBu0HfEMziIyYio",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "novel-e72dd.firebaseapp.com",
    projectId: process.env.FIREBASE_PROJECT_ID || "novel-e72dd",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "novel-e72dd.firebasestorage.app",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "161443188793",
    appId: process.env.FIREBASE_APP_ID || "1:161443188793:web:aa7d5d9df8640c6754bde8"
};

console.log('🚀 Building Novel Weaver with environment-based Firebase config...');
console.log('📦 Environment variables status:');
Object.keys(firebaseConfig).forEach(key => {
    const envKey = `FIREBASE_${key.replace(/([A-Z])/g, '_$1').toUpperCase()}`;
    const isFromEnv = !!process.env[envKey];
    console.log(`   ${envKey}: ${isFromEnv ? '✅ from environment' : '⚠️  using fallback'}`);
});

try {
    // Read the input HTML file
    const htmlContent = fs.readFileSync(INPUT_FILE, 'utf8');
    
    // Create the Firebase config object string
    const configString = `const firebaseConfig = {
            apiKey: "${firebaseConfig.apiKey}",
            authDomain: "${firebaseConfig.authDomain}",
            projectId: "${firebaseConfig.projectId}",
            storageBucket: "${firebaseConfig.storageBucket}",
            messagingSenderId: "${firebaseConfig.messagingSenderId}",
            appId: "${firebaseConfig.appId}"
        };`;
    
    // Replace the existing Firebase config in the HTML
    const configRegex = /const firebaseConfig = \{[^}]*\};/s;
    const updatedContent = htmlContent.replace(configRegex, configString);
    
    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    
    // Write the processed HTML to the output directory
    fs.writeFileSync(OUTPUT_FILE, updatedContent);
    
    // Copy static assets to dist directory
    const staticAssets = ['favicon.ico'];
    staticAssets.forEach(asset => {
        if (fs.existsSync(asset)) {
            fs.copyFileSync(asset, path.join(OUTPUT_DIR, asset));
            console.log(`📁 Copied ${asset} to dist/`);
        }
    });
    
    console.log('✅ Build completed successfully!');
    console.log(`📄 Output written to: ${OUTPUT_FILE}`);
    
} catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
}