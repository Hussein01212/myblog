const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const morgan = require('morgan');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// إعداد الجلسات
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// إعداد استراتيجية Google
passport.use(new GoogleStrategy({
    clientID: 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    callbackURL: 'http://localhost:3000/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
    // يمكنك حفظ بيانات المستخدم هنا
    return done(null, profile);
}));

// تسلسل المستخدم للجلسة
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// مسارات تسجيل الدخول باستخدام Google
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // تسجيل الدخول ناجح
        res.redirect('/');
    }
);

// تسجيل الخروج
app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

// Mock database
const users = [];

// Register endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (users.find(user => user.username === username)) {
        return res.json({ success: false, message: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.json({ success: true });
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
    if (user && await bcrypt.compare(password, user.password)) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Mock database for posts
const posts = [];

// Create Post endpoint
app.post('/create-post', (req, res) => {
    const { title, content } = req.body;
    const newPost = { id: posts.length + 1, title, content, date: new Date() };
    posts.push(newPost); // تأكد من أن المقال يتم إضافته هنا
    res.json({ success: true, post: newPost });
});

// Get Posts endpoint
app.get('/posts', (req, res) => {
    res.json(posts);
});

app.get('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = posts.find(p => p.id === postId);
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});

// Mock database for ads
let ads = '';

// Manage Ads endpoint
app.post('/manage-ads', (req, res) => {
    const { adContent } = req.body;
    ads = adContent;
    res.json({ success: true });
});

// Endpoint to get ads
app.get('/ads', (req, res) => {
    res.json({ adContent: ads });
});

app.get('/is-logged-in', (req, res) => {
    res.json({ loggedIn: req.isAuthenticated() });
});

// Mock database for comments
const comments = {};

// Endpoint to add a comment
app.post('/add-comment', (req, res) => {
    const { postId, comment } = req.body;
    if (!comments[postId]) {
        comments[postId] = [];
    }
    comments[postId].push({ comment, date: new Date() });
    res.json({ success: true });
});

// Endpoint to get comments for a post
app.get('/comments/:postId', (req, res) => {
    const postId = req.params.postId;
    res.json(comments[postId] || []);
});

let visitorCount = 0;

app.get('/visitor-count', (req, res) => {
    visitorCount++;
    res.json({ count: visitorCount });
});

// Mock database for popular posts
const popularPosts = [
    { id: 1, title: 'How to Learn JavaScript', likes: 120, shares: 45 },
    { id: 2, title: '10 Tips for Better Coding', likes: 95, shares: 30 },
    { id: 3, title: 'Understanding Async/Await', likes: 80, shares: 25 },
];

// Endpoint to get popular posts
app.get('/popular-posts', (req, res) => {
    res.json(popularPosts);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});