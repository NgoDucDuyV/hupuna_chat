import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <!DOCTYPE html>
      <html lang="vi">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hupuna Chat API - Service Ready</title>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">
        <style>
          :root {
            --primary: #0068FF;
            --secondary: #6B7280;
            --bg: #F3F4F6;
            --white: #ffffff;
          }
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Outfit', sans-serif;
            background: linear-gradient(135deg, #0068FF 0%, #0045A8 100%);
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--white);
          }
          .card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 3rem;
            border-radius: 2rem;
            text-align: center;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            max-width: 500px;
            width: 90%;
            animation: fadeIn 0.8s ease-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          h1 { font-size: 2.5rem; margin-bottom: 0.5rem; font-weight: 700; }
          p { font-size: 1.1rem; opacity: 0.9; margin-bottom: 2rem; line-height: 1.6; }
          .badge {
            display: inline-block;
            background: #10B981;
            color: white;
            padding: 0.5rem 1.5rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 600;
            margin-bottom: 2rem;
            box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.2);
          }
          .links { display: flex; gap: 1rem; justify-content: center; }
          .btn {
            text-decoration: none;
            padding: 0.75rem 1.5rem;
            border-radius: 1rem;
            font-size: 0.9rem;
            font-weight: 600;
            transition: all 0.3s;
          }
          .btn-primary { background: var(--white); color: var(--primary); }
          .btn-primary:hover { transform: scale(1.05); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
          .footer { margin-top: 2rem; font-size: 0.8rem; opacity: 0.7; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="badge">Backend Service Live</div>
          <h1>Hupuna Chat 👋</h1>
          <p>Chào mừng bạn đến với hệ thống API của Hupuna Chat. Kết nối thời gian thực, bảo mật và tốc độ.</p>
          <div class="links">
            <a href="/api" class="btn btn-primary">Tài liệu API</a>
          </div>
          <div class="footer">
            © 2026 Hupuna Chat. Designed with ❤️
          </div>
        </div>
      </body>
      </html>
    `;
  }
}
