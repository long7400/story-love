import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// ES modules không có __dirname, nên phải tính từ URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Đường dẫn đến thư mục FE
const feDirectory = path.join(__dirname, 'FE');

// Chạy Vite từ thư mục FE
const viteProcess = exec('npx vite', {
  cwd: feDirectory
});

viteProcess.stdout.on('data', (data) => {
  console.log(`[FE] ${data}`);
});

viteProcess.stderr.on('data', (data) => {
  console.error(`[FE Error] ${data}`);
});

viteProcess.on('close', (code) => {
  console.log(`FE process exited with code ${code}`);
});
