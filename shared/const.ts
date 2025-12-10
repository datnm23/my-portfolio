export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;

export const APP_TITLE = "My Portfolio - Nguyễn Mạnh Đạt";
export const APP_LOGO = "/logo.svg";

export const OWNER_NAME = "Nguyễn Mạnh Đạt";
export const OWNER_EMAIL = "datnm1594@gmail.com";
export const OWNER_PHONE = "033 274 5275";
export const OWNER_LOCATION = "Yên My, Yên Mo, Ninh Bình";

// Analytics & Contact
export const GOOGLE_ANALYTICS_ID = "G-XXXXXXXXXX"; // Replace with your GA ID
export const CONTACT_EMAIL = "datnm1594@gmail.com"; // Email for form submissions
export const CV_FILE_PATH = "/CV_Nguyen_Manh_Dat.pdf";
export const FORMSPREE_ID = "example@formspree.io"; // Replace with your Formspree ID
export const ADMIN_PASSWORD = "admin123"; // Replace with your password

export const SOCIAL_LINKS = {
  email: "datnm1594@gmail.com",
  phone: "033 274 5275",
  linkedin: "https://www.linkedin.com/in/your-profile",
  github: "https://github.com/your-profile",
  facebook: "https://www.facebook.com/your-profile",
};

export const SOFTWARE_SKILLS = [
  { name: "AutoCAD", icon: "/image/skills/autocad.svg" },
  { name: "Excel", icon: "/image/skills/excel.svg" },
  { name: "G8", icon: "/image/skills/g8.png" },
  { name: "Revit", icon: "/image/skills/revit.svg" },
  { name: "Project", icon: "/image/skills/project.svg" },
  { name: "Office", icon: "/image/skills/office.svg" },
  { name: "PowerPoint", icon: "/image/skills/powerpoint.svg" },
];

export const AVATAR_URL = "https://placehold.co/200x200/E1E7EF/1F2937?text=Avatar";

export const NAVIGATION_ITEMS = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Liên hệ", href: "/contact" },
];

export const SKILLS = [
  "Bóc tách khối lượng",
  "Lập hồ sơ dự thầu",
  "Thanh quyết toán công trình",
  "Quản lý dự án",
  "Microsoft Office",
  "AutoCAD",
  "G8",
];

export const PORTFOLIO_CATEGORIES = [
  { id: "qs", name_vi: "QS (Bóc tách khối lượng)", name_en: "QS (Quantity Surveyor)", description_vi: "Bóc tách khối lượng, kiểm tra chất lượng", description_en: "Quantity surveying, quality checking" },
  { id: "dutoan", name_vi: "Dự toán", name_en: "Bid Preparation", description_vi: "Lập hồ sơ dự thầu, tính toán giá trị", description_en: "Bid preparation, cost estimation" },
  { id: "thanhquyettoan", name_vi: "Thanh quyết toán", name_en: "Project Settlement", description_vi: "Kiểm tra hoàn thành, lập hồ sơ thanh toán", description_en: "Completion checking, settlement documents" },
];

export const GOOGLE_DRIVE_FOLDER_ID = "12PEiEtJPn1K0_CSykpHRo8t6ibOFRKLq";

export const SAMPLE_DOCUMENTS = [
  {
    id: 1,
    title: "BOQ Full - Khu dân cư Bắc Phú Cát",
    description: "Hồ sơ dự thầu đầy đủ với bóc tách khối lượng chi tiết cho dự án khu dân cư Bắc Phú Cát, Hà Nội. Bao gồm các hạng mục xây dựng, hệ thống điện, và các công trình phụ trợ.",
    fileName: "250717BOQFULLSỬA-OPB(ORIGINAL)R4-KCT-Gửi.xlsx",
    fileSize: "848 KB",
    type: "Hồ sơ dự thầu",
    category: "dutoan",
    content: "Bóc tách khối lượng chi tiết, danh sách vật tư, nhân công, máy móc, tính toán giá trị dự toán",
    googleDriveId: "12t4NrjGm6abNYFGiK781KpZanb1c-mje",
  },
  {
    id: 2,
    title: "BOQ Gọi thầu MEP - NET-HVC",
    description: "Hồ sơ gọi thầu cho hạng mục MEP (Mechanical, Electrical, Plumbing) của dự án NET-HVC. Bao gồm bóc tách khối lượng chi tiết cho các hệ thống cơ khí, điện, nước.",
    fileName: "NET-HVC-BOQ-GoithauMEP21T2-L1-23-10-2025.xlsx",
    fileSize: "377 KB",
    type: "Hồ sơ gọi thầu",
    category: "qs",
    content: "Danh sách vật tư MEP, khối lượng chi tiết, tính toán nhân công, bảng giá gọi thầu",
    googleDriveId: "1IvL2eIc9e9bFK6tbFyiDCrehuaIyMqe5",
  },
  {
    id: 3,
    title: "Thanh quyết toán đợt 2 - Sunshine Crystal River",
    description: "Hồ sơ thanh quyết toán đợt 2 cho dự án chung cư cao tầng Sunshine Crystal River. Bao gồm bảng khối lượng cốt thép, vật liệu hoàn thiện, và tính toán giá trị thanh toán.",
    fileName: "2025.08.11Thanhtoandot2-HD21.2025.CT01.SM-HL.xlsx",
    fileSize: "1010 KB",
    type: "Hồ sơ thanh quyết toán",
    category: "thanhquyettoan",
    content: "Bảng khối lượng cốt thép, bảng khối lượng vật liệu, tính toán thanh toán, báo cáo tiến độ",
    googleDriveId: "1XPFwum3FlJ7D8KYYi5RU5i_h7LZa3ulw",
  },
];

export const EXPERIENCES = [
  {
    id: 1,
    title: "Bid and Project Management Officer",
    company: "Investment JSC",
    period: "11/2023 - 05/2025",
    description: "Quản lý giao thầu, lập dự toán, thanh quyết toán dự án",
    responsibilities: [
      "Kiểm tra và bóc tách khối lượng công việc, lập ước tính giao thầu",
      "Soạn thảo hợp đồng và giám sát quản lý giao thầu",
      "Lập kế hoạch và quản lý quá trình xây dựng",
      "Rà soát hồ sơ thanh quyết toán theo chỉ đạo của quản lý",
      "Lập ngân sách và giám sát chi phí dự án",
    ],
  },
  {
    id: 2,
    title: "Kỹ sư Dự toán & Nhân viên Giao thầu",
    company: "Delta E&C Engineering and Construction JSC",
    period: "08/2022 - 10/2023",
    description: "Bóc tách khối lượng, lập hồ sơ dự thầu, quản lý dự án",
    responsibilities: [
      "Rà soát và chuẩn bị kế hoạch phát hành tài liệu giao thầu",
      "Bóc tách khối lượng công việc và lập hồ sơ dự thầu (BOQ)",
      "Giám sát tiến độ dự án và sản lượng xây dựng",
      "Quản lý tài liệu cho Phòng Kinh tế và Kế hoạch",
    ],
  },
  {
    id: 3,
    title: "Trưởng nhóm QA/QC",
    company: "Phúc Hùng Holdings Construction JSC",
    period: "02/2022 - 07/2022",
    description: "Quản lý chất lượng, kiểm tra khối lượng, chuẩn bị hồ sơ thanh toán",
    responsibilities: [
      "Chuẩn bị tài liệu pháp lý, chất lượng và vật liệu cho hồ sơ thanh toán",
      "Giám sát, kiểm tra và chuẩn bị báo cáo tiến độ chất lượng",
      "Lập kế hoạch mua sắm vật liệu và giám sát tổn thất",
    ],
  },
  {
    id: 4,
    title: "Kỹ sư Dự toán & Nhân viên QA/QC",
    company: "An Phúc Hùng JSC",
    period: "01/2018 - 02/2021",
    description: "Kiểm tra khối lượng, chuẩn bị hồ sơ thanh quyết toán",
    responsibilities: [
      "Kiểm tra khối lượng hoàn thành và chuẩn bị tài liệu thanh toán",
      "Chuẩn bị hồ sơ thanh quyết toán cho khách hàng",
    ],
  },
];

export const PROJECTS = [
  {
    id: 1,
    title: "Khu dân cư Bắc Phú Cát - Hà Nội",
    location: "Xã Hòa Lạc, Thành phố Hà Nội",
    year: "2024-2025",
    description: "Hồ sơ dự thầu đầy đủ với bóc tách khối lượng chi tiết cho dự án khu dân cư",
    role_vi: "Kỹ sư Dự toán",
    role_en: "Cost Engineer",
    category: "dutoan",
    responsibilities_vi: [
      "Bóc tách khối lượng công việc từ bản vẽ thiết kế",
      "Lập hồ sơ dự thầu chi tiết",
      "Tính toán giá trị dự toán từng hạng mục",
    ],
    responsibilities_en: [
      "Quantity surveying from design drawings",
      "Prepare detailed bid documents",
      "Calculate cost estimates for each item",
    ],
    highlights_vi: [
      "Hệ thống điện (Tủ điện hạ thế tổng, hệ thống phân phối)",
      "Các hạng mục xây dựng khác",
    ],
    highlights_en: [
      "Electrical systems (Main distribution board, distribution system)",
      "Other construction items",
    ],
    visible: true,
  },
  {
    id: 2,
    title: "Gọi thầu MEP - NET-HVC",
    location: "Dự án NET-HVC",
    year: "2024-2025",
    description: "Hồ sơ gọi thầu cho hạng mục MEP (Mechanical, Electrical, Plumbing)",
    role_vi: "Kỹ sư Dự toán",
    role_en: "Cost Engineer",
    category: "qs",
    responsibilities_vi: [
      "Chuẩn bị danh sách vật tư và nhân công",
      "Tính toán khối lượng chi tiết cho từng hạng mục MEP",
      "Lập hồ sơ gọi thầu cạnh tranh",
    ],
    responsibilities_en: [
      "Prepare materials and labor list",
      "Calculate detailed quantities for each MEP item",
      "Prepare competitive tender documents",
    ],
    highlights_vi: [
      "Hạng mục Mechanical, Electrical, Plumbing",
      "Danh sách vật tư chi tiết",
      "Tính toán nhân công chính xác",
    ],
    highlights_en: [
      "Mechanical, Electrical, Plumbing items",
      "Detailed materials list",
      "Accurate labor calculations",
    ],
    visible: true,
  },
  {
    id: 3,
    title: "Chung cư Sunshine Crystal River - Thanh quyết toán",
    location: "Dự án Sunshine Crystal River",
    year: "2024-2025",
    description: "Hồ sơ thanh quyết toán đợt 2 cho dự án chung cư cao tầng",
    role_vi: "Kỹ sư Dự toán",
    role_en: "Cost Engineer",
    category: "thanhquyettoan",
    responsibilities_vi: [
      "Kiểm tra khối lượng hoàn thành từ bản vẽ thiết kế",
      "Chuẩn bị bảng khối lượng chi tiết",
      "Lập hồ sơ thanh quyết toán đợt 2",
      "Xác định giá trị thanh toán cho khách hàng",
    ],
    responsibilities_en: [
      "Check completed quantity from design drawings",
      "Prepare detailed quantity tables",
      "Prepare project settlement documents",
      "Determine payment value for clients",
    ],
    highlights_vi: [
      "Bảng khối lượng cốt thép vách bể bơi, dầm bồn cây, sàn bồn cây",
      "Chi tiết kích thước, số lượng, trọng lượng cốt thép",
      "Tính toán khối lượng chi tiết",
    ],
    highlights_en: [
      "Steel reinforcement quantity for pool walls, tree planters, tree planter floors",
      "Detailed dimensions, quantities, steel weights",
      "Detailed quantity calculations",
    ],
    visible: true,
  },
];
