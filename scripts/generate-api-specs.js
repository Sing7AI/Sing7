#!/usr/bin/env node

/**
 * This script generates OpenAPI specifications for the Sing7 API endpoints.
 * It scans the pages/api directory and generates a specs file based on JSDoc comments.
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const API_DIR = path.join(__dirname, '../src/pages/api');
const OUTPUT_FILE = path.join(__dirname, '../public/api-specs.json');
const API_VERSION = '1.0.0';
const API_TITLE = 'Sing7 API';
const API_DESCRIPTION = 'API for the Sing7 Web3 Music Creation Platform';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.sing7.io';

// Basic OpenAPI structure
const openApiSpec = {
  openapi: '3.0.0',
  info: {
    title: API_TITLE,
    version: API_VERSION,
    description: API_DESCRIPTION,
  },
  servers: [
    {
      url: BASE_URL,
      description: 'Production API server',
    },
    {
      url: 'http://localhost:3000/api',
      description: 'Development API server',
    },
  ],
  paths: {},
  components: {
    schemas: {},
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

// Map Next.js API routes to OpenAPI paths
function generateApiSpecs() {
  try {
    // Find all API route files
    const apiFiles = glob.sync(`${API_DIR}/**/*.{js,ts}`);
    
    console.log(`Found ${apiFiles.length} API files`);
    
    // Process each API file
    apiFiles.forEach(file => {
      // Skip non-API files
      if (file.includes('_middleware') || file.includes('_utils')) {
        return;
      }
      
      // Convert file path to API endpoint
      let endpoint = file
        .replace(API_DIR, '')
        .replace(/\.(js|ts)$/, '')
        .replace(/\/index$/, '/');
      
      // Handle dynamic routes
      endpoint = endpoint.replace(/\[([^\]]+)\]/g, '{$1}');
      
      console.log(`Processing endpoint: ${endpoint}`);
      
      // For now, just add a placeholder for each endpoint
      // In a real implementation, this would parse JSDoc comments from the file
      openApiSpec.paths[endpoint] = {
        get: {
          summary: `GET ${endpoint}`,
          description: 'Auto-generated endpoint documentation',
          responses: {
            '200': {
              description: 'Successful response',
            },
          },
        },
      };
    });
    
    // Write the OpenAPI spec to file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(openApiSpec, null, 2));
    console.log(`OpenAPI spec written to ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('Error generating API specs:', error);
    process.exit(1);
  }
}

// Run the generator
generateApiSpecs(); 