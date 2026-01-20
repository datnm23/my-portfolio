# Hướng dẫn khắc phục vấn đề tải CV và Google Drive

## Vấn đề hiện tại
1. **CV không tải được** - File CV không download được hoặc mở không ra
2. **Google Drive links không hoạt động** - Các link xem trước Google Drive bị lỗi

## Nguyên nhân và Giải pháp

### 1. Vấn đề với đường dẫn file CV

**Nguyên nhân**: 
- Cấu hình Vite có `base: '/my-portfolio/'` cho production
- Đường dẫn file không đúng trong môi trường khác nhau

**Giải pháp**:
```typescript
// Đã tạo utility function trong client/src/lib/assets.ts
import { downloadFile } from '@/lib/assets';

// Sử dụng thay vì tự tạo link
downloadFile("CV_Nguyen_Manh_Dat.pdf");
```

### 2. Vấn đề với Google Drive links

**Nguyên nhân**:
- Google Drive IDs có thể không public
- Links không đúng format
- Permissions không được set đúng

**Giải pháp**:

1. **Kiểm tra Google Drive Files có public không:**
   - Vào Google Drive
   - Click chuột phải vào file → "Get link"
   - Chọn "Anyone with the link" can view
   - Copy ID từ URL

2. **Sử dụng multiple URL formats:**
```typescript
// Đã implement trong assets.ts với nhiều format khác nhau
const urls = [
  `https://docs.google.com/spreadsheets/d/${googleDriveId}/edit?usp=sharing`,
  `https://drive.google.com/file/d/${googleDriveId}/view?usp=sharing`,
  `https://docs.google.com/viewer?url=https://drive.google.com/uc?id=${googleDriveId}&export=download`
];
```

### 3. Cách test và debug

**Kiểm tra files có tồn tại:**
```bash
# Trong terminal
cd /home/datnm/projects/my_portfolio
ls -la client/public/

# Kiểm tra CV file
ls -la client/public/CV_Nguyen_Manh_Dat.pdf
```

**Test trong browser:**
1. Mở developer tools (F12)
2. Vào tab Console
3. Thử các lệnh:
```javascript
// Test CV file
fetch('/CV_Nguyen_Manh_Dat.pdf').then(r => console.log(r.status));

// Test Excel files
fetch('/2025.08.11Thanhtoandot2-HD21.2025.CT01.SM-HL.xlsx').then(r => console.log(r.status));
```

**Debug Google Drive:**
1. Kiểm tra Google Drive IDs trong `/shared/const.ts`
2. Thử mở trực tiếp link trong browser:
   - `https://docs.google.com/spreadsheets/d/12t4NrjGm6abNYFGiK781KpZanb1c-mje/edit?usp=sharing`
   - `https://drive.google.com/file/d/1IvL2eIc9e9bFK6tbFyiDCrehuaIyMqe5/view?usp=sharing`

### 4. Các bước khắc phục ngay

1. **Khắc phục ngay lỗi CV:**
```bash
# Kiểm tra file có tồn tại
ls -la client/public/CV_Nguyen_Manh_Dat.pdf

# Nếu không có, copy từ dist
cp dist/public/CV_Nguyen_Manh_Dat.pdf client/public/
```

2. **Cập nhật Google Drive permissions:**
   - Vào từng file Google Drive
   - Set permission thành "Anyone with the link can view"
   - Copy lại ID mới nếu cần

3. **Test bằng debug page:**
   - Tạo file debug: `/debug-assets.html`
   - Mở trong browser để test

### 5. Code đã được sửa

**Files đã update:**
- ✅ `client/src/lib/assets.ts` - Utility functions cho assets
- ✅ `client/src/components/SampleDocuments.tsx` - Sử dụng utility functions
- ✅ `client/src/pages/About.tsx` - Sử dụng utility functions cho CV

**Chức năng mới:**
- ✅ Error handling tốt hơn
- ✅ Multiple fallback URLs cho Google Drive
- ✅ Console logging để debug
- ✅ User-friendly error messages

### 6. Next steps

1. **Test ngay trên development:**
```bash
cd /home/datnm/projects/my_portfolio
pnpm dev
# Vào http://localhost:3000 và test download
```

2. **Nếu vẫn lỗi, check Console:**
   - Mở F12 → Console
   - Xem error messages
   - Check Network tab để xem requests

3. **Production deployment:**
   - Đảm bảo files được copy đúng vào build directory
   - Test base path `/my-portfolio/` 

## Liên hệ debug thêm
Nếu vẫn còn lỗi, hãy:
1. Mở developer console (F12)
2. Thử download và chụp screenshot error
3. Check Network tab xem request nào fail
4. Share error messages để debug tiếp
