// Script để khởi động phần frontend
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('[FE] Đang khởi động Vite server...');

const viteServer = exec('cd FE && npx vite --port 3000', {
  cwd: __dirname
});

viteServer.stdout.on('data', (data) => {
  console.log(`[FE] ${data}`);
});

viteServer.stderr.on('data', (data) => {
  console.error(`[FE Error] ${data}`);
});

viteServer.on('close', (code) => {
  console.log(`[FE] Vite server đã đóng với mã thoát: ${code}`);
});

// Xử lý khi process kết thúc
process.on('SIGINT', () => {
  console.log('Đang đóng Vite server...');
  viteServer.kill();
  process.exit();
});