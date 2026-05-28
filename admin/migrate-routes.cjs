const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'routes');
const destDir = path.join(__dirname, 'src', 'pages');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
}

const mappings = {
    'admin.products.tsx': 'Products.tsx',
    'admin.orders.tsx': 'Orders.tsx',
    'admin.users.tsx': 'Users.tsx',
    'admin.spreadsheet.tsx': 'Spreadsheet.tsx'
};

for (const [srcFile, destFile] of Object.entries(mappings)) {
    const srcPath = path.join(srcDir, srcFile);
    if (fs.existsSync(srcPath)) {
        let content = fs.readFileSync(srcPath, 'utf8');
        
        // Remove import { createFileRoute } from "@tanstack/react-router";
        content = content.replace(/import { createFileRoute } from "@tanstack\/react-router";\n?/g, '');
        
        // Remove export const Route = createFileRoute(...)({ component: X });
        content = content.replace(/export const Route = createFileRoute\([^)]+\)\({\s*component:\s*([a-zA-Z0-9_]+),?\s*}\);/g, 'export default $1;');
        
        // Specific fix for ProductsPage since it's already a function
        // Wait, if it has `function ProductsPage()`, and we replace Route with `export default ProductsPage;`, we're good.
        
        fs.writeFileSync(path.join(destDir, destFile), content);
        console.log(`Transformed ${srcFile} -> ${destFile}`);
    }
}
