from config import settings
import os

# Lấy DATABASE_URL từ settings
url = settings.DATABASE_URL

# Gọi lệnh system để chạy sqlacodegen
os.system(f"sqlacodegen {url} > app/models/models.py")