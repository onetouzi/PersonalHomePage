const DEFAULT_PROFILE_DATA = {
    profile: {
        name: { zh: "王帅豪", en: "Wang Shuaihao" },
        role: { zh: "Java 后端开发工程师 / AI 算法工程师", en: "Java Backend Engineer / AI Algorithm Engineer" },
        summary: {
            zh: "聚焦后端工程、深度学习、多模态学习与模型推理优化方向，具备 Java 后端开发、分布式系统设计、模型训练调优和推理部署经验。熟悉 Spring Boot、RocketMQ、Redis、MySQL、PyTorch、TensorRT 等技术，能够独立完成业务系统开发、模型实验分析与性能优化落地。",
            en: "Focused on backend engineering, deep learning, multimodal learning, and model inference optimization. Experienced in Java backend development, distributed system design, model training, tuning, and inference deployment. Familiar with Spring Boot, RocketMQ, Redis, MySQL, PyTorch, and TensorRT."
        },
        contacts: [
            { icon: "☎", value: { zh: "+86 15903681859", en: "+86 15903681859" } },
            { icon: "✉", value: { zh: "wwwtouzi@outlook.com", en: "wwwtouzi@outlook.com" } },
            { icon: "⌂", value: { zh: "https://onetouzi.github.io", en: "https://onetouzi.github.io" } }
        ],
        schools: [
            {
                name: { zh: "河南农业大学", en: "Henan Agricultural University" },
                detail: { zh: "计算机科学与技术 · 2022-2026", en: "Computer Science and Technology · 2022-2026" }
            },
            {
                name: { zh: "北京邮电大学", en: "Beijing University of Posts and Telecommunications" },
                detail: { zh: "人工智能 · 2026-至今", en: "Artificial Intelligence · 2026-Present" }
            }
        ]
    },
    education: [
        {
            visible: true,
            school: { zh: "北京邮电大学", en: "Beijing University of Posts and Telecommunications" },
            major: { zh: "人工智能专业", en: "Artificial Intelligence" },
            degree: { zh: "硕士研究生（研 0）", en: "Master's student" },
            time: { zh: "2026.09 - 至今", en: "Sep 2026 - Present" },
            details: { zh: "保送攻读人工智能方向硕士研究生。", en: "Recommended admission to the master's program in Artificial Intelligence." }
        },
        {
            visible: true,
            school: { zh: "河南农业大学", en: "Henan Agricultural University" },
            major: { zh: "计算机科学与技术专业", en: "Computer Science and Technology" },
            degree: { zh: "本科", en: "Bachelor" },
            time: { zh: "2022.09 - 2026.06", en: "Sep 2022 - Jun 2026" },
            details: { zh: "绩点排名前 3%。", en: "Ranked in the top 3% by GPA." }
        }
    ],
    internships: [
        {
            visible: true,
            company: { zh: "久其软件 - 教育事业部", en: "Join-Cheer Software - Education Division" },
            role: { zh: "Java 后端开发实习生", en: "Java Backend Development Intern" },
            time: { zh: "2025.10 - 2026.02", en: "Oct 2025 - Feb 2026" },
            points: {
                zh: [
                    "参与高校资产管理系统迭代，负责业务模块开发与接口实现。",
                    "集成阿里云短信服务，为工作流审批节点实现自动短信提醒。",
                    "抽象招标、中标等复杂业务链路状态，实现全链路追踪与可视化监控。",
                    "实现工作流逾期自动审批、待办人查询、低代码平台表单校验，并负责日常 bug 修复与线上问题排查。"
                ],
                en: [
                    "Contributed to iterations of a university asset management system and implemented business modules and APIs.",
                    "Integrated Alibaba Cloud SMS to support automatic reminders for workflow approval nodes.",
                    "Abstracted complex bidding-related state flows and built full-chain tracking and visualization.",
                    "Implemented overdue workflow auto-approval, assignee queries, low-code form validation, and handled bug fixes and production issue investigation."
                ]
            }
        }
    ],
    projects: [
        {
            visible: true,
            type: "horizontal",
            title: { zh: "SaaS 短链接系统", en: "SaaS Short Link System" },
            time: { zh: "2025 - 2026", en: "2025 - 2026" },
            stack: {
                zh: "SpringBoot · SpringCloudAlibaba · MySQL · Redis · RocketMQ · ShardingSphere · Sentinel",
                en: "SpringBoot · SpringCloudAlibaba · MySQL · Redis · RocketMQ · ShardingSphere · Sentinel"
            },
            summary: {
                zh: "为企业和个人用户提供高效、安全、可靠的短链接管理平台，支持深入分析和跟踪，用户可以灵活管理和优化链接。经实际压测，新增短链接峰值 12k/TPS，短链接跳转峰值 56k/QPS。",
                en: "Built an efficient, secure, and reliable short-link management platform for enterprise and individual users, with analytics, tracking, and flexible link optimization. In load testing, short-link creation reached 12k TPS and redirection reached 56k QPS."
            },
            points: {
                zh: [
                    "使用 RocketMQ 消息队列“削峰”，完成海量访问短链接场景下的监控信息存储功能。",
                    "封装缓存不存在读取功能，通过双重判定锁优化更新或失效场景下大量查询数据库问题。",
                    "通过更新数据库删除缓存策略，保障短链接缓存与数据库之间的数据一致性功能。",
                    "通过 Redis 完成消息队列消费业务下的幂等场景，保障消息在一定时间内消费且仅消费一次。"
                ],
                en: [
                    "Used RocketMQ to smooth traffic spikes and persist monitoring data under high-volume short-link access.",
                    "Encapsulated cache-miss reads and optimized heavy database queries during update or expiration scenarios with double-checked locking.",
                    "Adopted an update-database-delete-cache strategy to maintain consistency between short-link cache and database records.",
                    "Implemented Redis-based idempotency for message queue consumers, ensuring each message is consumed within a time window and only once."
                ]
            }
        },
        {
            visible: true,
            type: "horizontal",
            title: { zh: "电商券管平台", en: "E-commerce Coupon Management Platform" },
            time: { zh: "2026.01 - 2026.03", en: "Jan 2026 - Mar 2026" },
            stack: { zh: "SpringBoot · RocketMQ · ShardingSphere · Redis · MySQL", en: "SpringBoot · RocketMQ · ShardingSphere · Redis · MySQL" },
            summary: {
                zh: "支持优惠券秒杀、分发、结算、搜索等业务，保障大规模用户同时领券场景下不漏发、不多发，并提升平台 GMV 指标。",
                en: "Built coupon seckill, distribution, settlement, and search flows, ensuring accurate issuance under high concurrency."
            },
            points: {
                zh: [
                    "使用 EasyExcel 解析百万量级用户优惠券推送 Excel 文件，避免大文件导致内存溢出。",
                    "采用布隆过滤器、缓存空值和分布式锁解决缓存击穿与缓存穿透问题。",
                    "通过责任链模式验证商家创建优惠券参数，保障验证代码高内聚、低耦合。",
                    "为用户优惠券表创建唯一索引，并结合乐观自旋机制重试，确保优惠券限制条件生效。"
                ],
                en: [
                    "Parsed million-row coupon delivery Excel files with EasyExcel to avoid memory overflow.",
                    "Used Bloom filters, null caching, and distributed locks to handle cache breakdown and penetration.",
                    "Applied the Chain of Responsibility pattern to validate merchant coupon parameters with high cohesion and low coupling.",
                    "Created unique indexes and optimistic spin retry logic to enforce coupon constraints accurately."
                ]
            }
        },
        {
            visible: true,
            type: "horizontal",
            title: { zh: "YOLOv5 目标检测模型的 TensorRT 推理优化", en: "TensorRT Inference Optimization for YOLOv5 Object Detection" },
            time: { zh: "2026.02 - 2026.05", en: "Feb 2026 - May 2026" },
            stack: { zh: "OpenCV · CUDA · TensorRT · PyTorch · C++", en: "OpenCV · CUDA · TensorRT · PyTorch · C++" },
            summary: {
                zh: "基于 TensorRT C++ API 构建 YOLOv5 推理引擎，通过层融合、CUDA 自定义算子和 INT8 量化优化推理性能。",
                en: "Built a YOLOv5 inference engine with the TensorRT C++ API and optimized performance through layer fusion, custom CUDA operators, and INT8 quantization."
            },
            points: {
                zh: [
                    "使用 TensorRT Network Definition API 手工搭建完整 YOLOv5 网络，替代 ONNX 导出以获得更细粒度的图优化控制。",
                    "编写 CUDA 自定义算子封装多尺度检测头的 anchor 解码与边框回归逻辑。",
                    "实现 GPU 端 CUDA 并行预处理，将 letterbox resize 与归一化从 CPU 迁移至 GPU。",
                    "基于 Entropy Calibrator 实现 INT8 量化推理，完成校准数据采集与精度验证。"
                ],
                en: [
                    "Manually constructed the YOLOv5 network with TensorRT Network Definition API for finer graph optimization control.",
                    "Developed custom CUDA operators for anchor decoding and bounding-box regression across multi-scale detection heads.",
                    "Moved letterbox resize and normalization from CPU to GPU with CUDA parallel preprocessing.",
                    "Implemented INT8 quantized inference with Entropy Calibrator and completed calibration data collection and accuracy validation."
                ]
            }
        },
        {
            visible: true,
            type: "research",
            title: { zh: "基于跨模态自适应注意力协作的乳腺癌生物标志物预测方法", en: "Cross-modal Adaptive Attention for Breast Cancer Biomarker Prediction" },
            time: { zh: "2024.11 - 2025.05", en: "Nov 2024 - May 2025" },
            stack: { zh: "PyTorch · Transformer · BERT · 多模态学习", en: "PyTorch · Transformer · BERT · Multimodal Learning" },
            summary: {
                zh: "第一作者，发表于 BIBM 2025（CCF-B 类会议）。设计异构双分支架构融合病理图像与临床文本数据。",
                en: "First author, published at BIBM 2025 (CCF-B). Designed a heterogeneous dual-branch architecture to fuse pathology images and clinical text."
            },
            points: {
                zh: [
                    "利用分层 Transformer 提取病理图像语义特征，结合 BERT 处理临床文本。",
                    "引入自适应注意力机制缓解跨模态特征对齐难题。",
                    "负责数据清洗、标注质检、模型训练、超参调优与 badcase 分析。"
                ],
                en: [
                    "Extracted pathology image semantics with hierarchical Transformer modules and encoded clinical text with BERT.",
                    "Introduced adaptive attention to reduce cross-modal feature alignment difficulty.",
                    "Handled data cleaning, label quality checks, model training, hyperparameter tuning, and bad-case analysis."
                ]
            }
        }
    ],
    awards: [
        { visible: true, text: { zh: "2024 年获得国家奖学金", en: "National Scholarship, 2024" } },
        { visible: true, text: { zh: "2024 年获得蓝桥杯全国二等奖", en: "Lanqiao Cup National Second Prize, 2024" } },
        { visible: true, text: { zh: "2025 年以第一作者发表 CCF-B 会议（BIBM）论文", en: "First-author paper accepted by BIBM, a CCF-B conference, 2025" } },
        { visible: true, text: { zh: "2024 年获得团体程序设计天梯赛全国个人三等奖", en: "National Individual Third Prize, Group Programming Ladder Tournament, 2024" } },
        { visible: true, text: { zh: "2024 年获得中国大学生程序设计竞赛邀请赛（CCPC）铜牌", en: "Bronze Medal, CCPC Invitational, 2024" } }
    ],
    skills: [
        {
            visible: true,
            title: { zh: "后端开发", en: "Backend Engineering" },
            text: { zh: "熟悉 Java、Spring Boot、FastAPI、MySQL、Redis、RocketMQ、ShardingSphere，具备高并发、缓存一致性、消息队列和分库分表实践经验。", en: "Familiar with Java, Spring Boot, FastAPI, MySQL, Redis, RocketMQ, and ShardingSphere, with practical experience in high concurrency, cache consistency, message queues, and sharding." }
        },
        {
            visible: true,
            title: { zh: "深度学习与模型工程", en: "Deep Learning and Model Engineering" },
            text: { zh: "熟练使用 PyTorch，理解 CNN、RNN、LSTM、Transformer、ViT、BERT 等模型，熟悉 TensorRT、CUDA 自定义算子、INT8 量化与推理优化。", en: "Skilled with PyTorch and familiar with CNN, RNN, LSTM, Transformer, ViT, and BERT. Experienced with TensorRT, custom CUDA operators, INT8 quantization, and inference optimization." }
        },
        {
            visible: true,
            title: { zh: "工程工具", en: "Engineering Tools" },
            text: { zh: "熟悉 Git、Maven、Docker、Linux 常用命令，习惯使用 Codex、Claude、ChatGPT、DeepSeek 等 AI 工具辅助需求拆解、代码开发、接口联调和部署实现。", en: "Familiar with Git, Maven, Docker, and common Linux commands. Uses AI tools such as Codex, Claude, ChatGPT, and DeepSeek to support requirement analysis, coding, API integration, and deployment." }
        }
    ]
};
