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
    title_en: "Full BOQ - Bac Phu Cat Residential Area",
    description: "Hồ sơ dự thầu đầy đủ với bóc tách khối lượng chi tiết cho dự án khu dân cư Bắc Phú Cát, Hà Nội. Bao gồm các hạng mục xây dựng, hệ thống điện, và các công trình phụ trợ.",
    description_en: "Complete bidding documents with detailed quantity take-off for Bac Phu Cat residential project, Hanoi. Including construction items, electrical systems, and auxiliary works.",
    fileName: "250717BOQFULLSỬA-OPB(ORIGINAL)R4-KCT-Gửi.xlsx",
    fileSize: "848 KB",
    type: "Hồ sơ dự thầu",
    type_en: "Bidding Documents",
    category: "dutoan",
    content: "Bóc tách khối lượng chi tiết, danh sách vật tư, nhân công, máy móc, tính toán giá trị dự toán",
    content_en: "Detailed quantity take-off, materials list, labor, machinery, cost estimate calculations",
    googleDriveId: "12t4NrjGm6abNYFGiK781KpZanb1c-mje",
  },
  {
    id: 2,
    title: "BOQ Gọi thầu MEP - NET-HVC",
    title_en: "MEP Tender BOQ - NET-HVC",
    description: "Hồ sơ gọi thầu cho hạng mục MEP (Mechanical, Electrical, Plumbing) của dự án NET-HVC. Bao gồm bóc tách khối lượng chi tiết cho các hệ thống cơ khí, điện, nước.",
    description_en: "Tender documents for MEP (Mechanical, Electrical, Plumbing) of NET-HVC project. Including detailed quantity take-off for mechanical, electrical, and plumbing systems.",
    fileName: "NET-HVC-BOQ-GoithauMEP21T2-L1-23-10-2025.xlsx",
    fileSize: "377 KB",
    type: "Hồ sơ gọi thầu",
    type_en: "Tender Documents",
    category: "qs",
    content: "Danh sách vật tư MEP, khối lượng chi tiết, tính toán nhân công, bảng giá gọi thầu",
    content_en: "MEP materials list, detailed quantities, labor calculations, tender pricing schedule",
    googleDriveId: "1IvL2eIc9e9bFK6tbFyiDCrehuaIyMqe5",
  },
  {
    id: 3,
    title: "Thanh quyết toán đợt 2 - Sunshine Crystal River",
    title_en: "Payment Settlement Phase 2 - Sunshine Crystal River",
    description: "Hồ sơ thanh quyết toán đợt 2 cho dự án chung cư cao tầng Sunshine Crystal River. Bao gồm bảng khối lượng cốt thép, vật liệu hoàn thiện, và tính toán giá trị thanh toán.",
    description_en: "Payment settlement documents phase 2 for Sunshine Crystal River high-rise apartment project. Including steel reinforcement quantities, finishing materials, and payment value calculations.",
    fileName: "2025.08.11Thanhtoandot2-HD21.2025.CT01.SM-HL.xlsx",
    fileSize: "1010 KB",
    type: "Hồ sơ thanh quyết toán",
    type_en: "Settlement Documents",
    category: "thanhquyettoan",
    content: "Bảng khối lượng cốt thép, bảng khối lượng vật liệu, tính toán thanh toán, báo cáo tiến độ",
    content_en: "Steel reinforcement quantity tables, material quantity tables, payment calculations, progress reports",
    googleDriveId: "1XPFwum3FlJ7D8KYYi5RU5i_h7LZa3ulw",
  },
];

export const EXPERIENCES = [
  {
    id: 1,
    title: "Trưởng nhóm kế hoạch đấu thầu",
    title_en: "Bid Planning Team Leader",
    company: "AZ Investment JSC",
    period: "11/2023 - 04/2025",
    description: "Quản lý đấu thầu, kế hoạch & tiến độ, chi phí dự án",
    description_en: "Manage bidding, planning & scheduling, project cost control",
    responsibilities: [
      "Lập dự toán & đấu thầu: Kiểm soát bóc tách khối lượng; xây dựng ngân sách và lập dự toán chi tiết gói thầu",
      "Quản lý hợp đồng thầu phụ: Chủ trì soạn thảo, đàm phán các điều khoản và quản lý hợp đồng thầu phụ",
      "Quản lý kế hoạch & tiến độ: Xây dựng kế hoạch triển khai dự án tổng thể",
      "Kiểm soát thanh quyết toán: Rà soát và thẩm định hồ sơ thanh toán, quyết toán",
      "Kiểm soát chi phí: Lập kế hoạch dòng tiền, giám sát định kỳ biến động chi phí",
    ],
    responsibilities_en: [
      "Estimation & Bidding: Control quantity take-offs; build budget and detailed cost estimates",
      "Subcontract Management: Lead drafting, negotiating terms and managing subcontracts",
      "Planning & Scheduling: Develop comprehensive project implementation plans",
      "Settlement Control: Review and verify payment and settlement documents",
      "Cost Control: Develop cash flow plans, periodically monitor cost fluctuations",
    ],
  },
  {
    id: 2,
    title: "Kỹ sư Dự toán & Đấu thầu",
    title_en: "Cost Engineer & Bidding Staff",
    company: "Delta E&C Engineering and Construction JSC",
    period: "08/2022 - 10/2023",
    description: "Lập hồ sơ dự thầu",
    description_en: "Prepare bidding documents",
    responsibilities: [
      "Bóc tách khối lượng & lập dự toán: Bóc tách khối lượng từ bản vẽ thiết kế",
      "Xây dựng đơn giá: Tìm kiếm, đánh giá và đàm phán với Thầu phụ/Nhà cung cấp",
      "Lập hồ sơ dự thầu: Hoàn thiện hồ sơ dự thầu (Hồ sơ pháp lý, năng lực, tài chính)",
      "Đàm phán và Thương thảo hợp đồng: Phân tích rủi ro, tham gia bảo vệ giá",
    ],
    responsibilities_en: [
      "Quantity Take-off & Estimation: Extract quantities from design drawings",
      "Unit Price Development: Search, evaluate and negotiate with Subcontractors/Suppliers",
      "Bid Preparation: Complete bid documents (Legal, capability, financial documents)",
      "Contract Negotiation: Risk analysis, participate in price defense and negotiation",
    ],
  },
  {
    id: 3,
    title: "Trưởng nhóm QA/QC",
    title_en: "QA/QC Team Leader",
    company: "Phục Hưng Holdings Construction JSC",
    period: "02/2022 - 07/2022",
    description: "Quản lý chất lượng, kiểm tra khối lượng, chuẩn bị hồ sơ thanh toán",
    description_en: "Quality management, quantity verification, payment document preparation",
    responsibilities: [
      "Chuẩn bị hồ sơ pháp lý, hồ sơ chất lượng và vật liệu cho hồ sơ thanh toán",
      "Giám sát, kiểm tra và chuẩn bị báo cáo tiến độ chất lượng",
      "Lập kế hoạch mua sắm vật liệu và giám sát tổn thất",
    ],
    responsibilities_en: [
      "Prepare legal, quality and material documents for payment files",
      "Supervise, inspect and prepare quality progress reports",
      "Plan material procurement and monitor losses",
    ],
    visible: false,
  },
  {
    id: 4,
    title: "Kỹ sư QS & Kỹ sư QA/QC",
    title_en: "QS Engineer & QA/QC Engineer",
    company: "Công ty cổ phần đầu tư và phát triển đô thị An Phúc Hưng",
    period: "01/2018 - 02/2022",
    description: "Chủ trì lập hồ sơ thanh toán và quản lý chi phí",
    description_en: "Lead payment documentation and cost management",
    responsibilities: [
      "Quản lý thanh toán: Chuẩn bị hồ sơ pháp lý, hồ sơ nghiệm thu",
      "Kiểm soát khối lượng: Bóc tách khối lượng (BOQ); kiểm soát hao hụt vật tư",
      "Quản lý thầu phụ: Soạn thảo hợp đồng tổ đội/thầu phụ",
      "Báo cáo & kiểm soát chi phí: Theo dõi tình trạng thực hiện hợp đồng",
    ],
    responsibilities_en: [
      "Payment Management: Prepare legal documents, acceptance documents",
      "Quantity Control: Quantity take-off (BOQ); control material wastage",
      "Subcontractor Management: Draft team/subcontractor contracts",
      "Reporting & Cost Control: Monitor contract implementation status",
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
    category: "dutoan", // deprecated
    categories: ["dutoan"],
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
    documentIds: [1],
  },
  {
    id: 2,
    title: "Gọi thầu MEP - NET-HVC",
    location: "Dự án NET-HVC",
    year: "2024-2025",
    description: "Hồ sơ gọi thầu cho hạng mục MEP (Mechanical, Electrical, Plumbing)",
    role_vi: "Kỹ sư Dự toán",
    role_en: "Cost Engineer",
    category: "qs", // deprecated
    categories: ["qs"],
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
    documentIds: [2],
  },
  {
    id: 3,
    title: "Chung cư Sunshine Crystal River - Thanh quyết toán",
    location: "Dự án Sunshine Crystal River",
    year: "2024-2025",
    description: "Hồ sơ thanh quyết toán đợt 2 cho dự án chung cư cao tầng",
    role_vi: "Kỹ sư Dự toán",
    role_en: "Cost Engineer",
    category: "thanhquyettoan", // deprecated
    categories: ["thanhquyettoan"],
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
    documentIds: [3],
  },
];
