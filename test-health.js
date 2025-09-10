#!/usr/bin/env node

// Simple health check test script
const http = require('http');

const testHealthEndpoint = (host, port, path) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: host,
      port: port,
      path: path,
      method: 'GET',
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
};

// Test local health endpoint
const testLocal = async () => {
  try {
    console.log('Testing local health endpoint...');
    const result = await testHealthEndpoint('localhost', 8080, '/api/health');
    console.log('✅ Local health check successful:');
    console.log(`Status: ${result.status}`);
    console.log(`Response: ${result.body}`);
  } catch (error) {
    console.log('❌ Local health check failed:', error.message);
  }
};

// Test Railway health endpoint (replace with your Railway URL)
const testRailway = async (railwayUrl) => {
  if (!railwayUrl) {
    console.log('⚠️  Railway URL not provided');
    return;
  }
  
  try {
    console.log(`Testing Railway health endpoint: ${railwayUrl}/api/health`);
    const url = new URL(railwayUrl);
    const result = await testHealthEndpoint(url.hostname, url.port || (url.protocol === 'https:' ? 443 : 80), '/api/health');
    console.log('✅ Railway health check successful:');
    console.log(`Status: ${result.status}`);
    console.log(`Response: ${result.body}`);
  } catch (error) {
    console.log('❌ Railway health check failed:', error.message);
  }
};

// Run tests
(async () => {
  await testLocal();
  console.log('---');
  
  // Example usage: node test-health.js https://your-railway-url.up.railway.app
  const railwayUrl = process.argv[2];
  if (railwayUrl) {
    await testRailway(railwayUrl);
  } else {
    console.log('💡 Tip: Run with Railway URL to test remote endpoint:');
    console.log('   node test-health.js https://your-railway-url.up.railway.app');
  }
})();
