"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
// Configure multer for file uploads
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage });
// Stats routes
router.get('/stats', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO: Implement database query
        const stats = [
            {
                id: '1',
                title: 'Volontari attivi',
                value: 150,
                icon: 'fa-users',
                description: 'Volontari che operano quotidianamente'
            },
            {
                id: '2',
                title: 'Veicoli disponibili',
                value: 12,
                icon: 'fa-ambulance',
                description: 'Veicoli di soccorso e trasporto'
            },
            {
                id: '3',
                title: 'Anni di servizio',
                value: 35,
                icon: 'fa-calendar',
                description: 'Anni di attività al servizio della comunità'
            }
        ];
        res.json(stats);
    }
    catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Stats CRUD operations
router.post('/stats', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, value, icon, description } = req.body;
        // TODO: Implement database insert
        const newStat = {
            id: Date.now().toString(),
            title,
            value: Number(value),
            icon,
            description
        };
        res.status(201).json(newStat);
    }
    catch (error) {
        console.error('Error creating stat:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
router.put('/stats/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, value, icon, description } = req.body;
        // TODO: Implement database update
        const updatedStat = {
            id,
            title,
            value: Number(value),
            icon,
            description
        };
        res.json(updatedStat);
    }
    catch (error) {
        console.error('Error updating stat:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
router.delete('/stats/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // TODO: Implement database delete
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting stat:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// News routes
router.get('/news', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO: Implement database query
        const news = [
            {
                id: '1',
                title: 'Nuovo corso BLSD',
                content: 'Inizierà il prossimo mese un nuovo corso di formazione BLSD...',
                image: '/images/news/blsd-course.jpg',
                date: '2024-03-15'
            },
            {
                id: '2',
                title: 'Ampliamento flotta',
                content: 'La nostra associazione ha ricevuto due nuove ambulanze...',
                image: '/images/news/new-ambulances.jpg',
                date: '2024-03-10'
            }
        ];
        res.json(news);
    }
    catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// News CRUD operations
router.post('/news', upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, date } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : '/images/news/default.jpg';
        // TODO: Implement database insert
        const newNews = {
            id: Date.now().toString(),
            title,
            content,
            image,
            date: date || new Date().toISOString().split('T')[0]
        };
        res.status(201).json(newNews);
    }
    catch (error) {
        console.error('Error creating news:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
router.put('/news/:id', upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, content, date } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : undefined;
        // TODO: Implement database update
        const updatedNews = {
            id,
            title,
            content,
            image: image || '/images/news/default.jpg',
            date: date || new Date().toISOString().split('T')[0]
        };
        res.json(updatedNews);
    }
    catch (error) {
        console.error('Error updating news:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
router.delete('/news/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // TODO: Implement database delete
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting news:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Projects routes
router.get('/projects', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO: Implement database query
        const projects = [
            {
                id: '1',
                title: 'Trasporti Sanitari',
                description: 'Servizio di trasporto per visite mediche e terapie, garantendo assistenza e comfort.',
                image: '/images/projects/transport.jpg',
                category: 'Servizi',
                status: 'Attivo'
            },
            {
                id: '2',
                title: 'Corsi BLSD',
                description: 'Formazione sulle manovre di primo soccorso e uso del defibrillatore.',
                image: '/images/projects/blsd.jpg',
                category: 'Formazione',
                status: 'Attivo'
            },
            {
                id: '3',
                title: 'Emergenza 118',
                description: 'Supporto alle operazioni di emergenza territoriale.',
                image: '/images/projects/emergency.jpg',
                category: 'Emergenza',
                status: 'Attivo'
            }
        ];
        res.json(projects);
    }
    catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Projects CRUD operations
router.post('/projects', upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, category, status } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : '/images/projects/default.jpg';
        // TODO: Implement database insert
        const newProject = {
            id: Date.now().toString(),
            title,
            description,
            image,
            category,
            status: status || 'Attivo'
        };
        res.status(201).json(newProject);
    }
    catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
router.put('/projects/:id', upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description, category, status } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : undefined;
        // TODO: Implement database update
        const updatedProject = {
            id,
            title,
            description,
            image: image || '/images/projects/default.jpg',
            category,
            status: status || 'Attivo'
        };
        res.json(updatedProject);
    }
    catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
router.delete('/projects/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // TODO: Implement database delete
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
