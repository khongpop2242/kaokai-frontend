// Script to copy index.html to all routes for SPA routing on static hosts
const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '../build');
const indexPath = path.join(buildDir, 'index.html');

// Routes that need index.html copies
const routes = [
  'register',
  'login',
  'products',
  'product',
  'promotions',
  'contact',
  'about',
  'cart',
  'favorites',
  'profile',
  'forgot-password',
  'reset-password',
  'admin',
  'checkout',
  'payment',
  'order'
];

// Ensure build directory exists
if (!fs.existsSync(buildDir)) {
  console.error('Build directory not found. Run "npm run build" first.');
  process.exit(1);
}

// Ensure index.html exists
if (!fs.existsSync(indexPath)) {
  console.error('index.html not found in build directory.');
  process.exit(1);
}

// Read index.html
const indexContent = fs.readFileSync(indexPath, 'utf8');

// Create directories and copy index.html for each route
routes.forEach(route => {
  const routeDir = path.join(buildDir, route);
  const routeIndexPath = path.join(routeDir, 'index.html');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  
  // Copy index.html
  fs.writeFileSync(routeIndexPath, indexContent);
  console.log(`✓ Created ${route}/index.html`);
});

console.log('\n✅ SPA routing files created successfully!');

