"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const programs_1 = __importDefault(require("./routes/programs"));
const blog_1 = __importDefault(require("./routes/blog"));
const members_1 = __importDefault(require("./routes/members"));
const leadership_1 = __importDefault(require("./routes/leadership"));
const tracks_1 = __importDefault(require("./routes/tracks"));
const labs_1 = __importDefault(require("./routes/labs"));
const news_1 = __importDefault(require("./routes/news"));
const resources_1 = __importDefault(require("./routes/resources"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// API Routes
app.use('/api/programs', programs_1.default);
app.use('/api/blog', blog_1.default);
app.use('/api/members', members_1.default);
app.use('/api/leadership', leadership_1.default);
app.use('/api/tracks', tracks_1.default);
app.use('/api/labs', labs_1.default);
app.use('/api/news', news_1.default);
app.use('/api/resources', resources_1.default);
// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Backend is running' });
});
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`[Server] running on http://localhost:${PORT}`);
    });
}
exports.default = app;
