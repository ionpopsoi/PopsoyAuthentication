import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT || 5443;

app.listen(PORT, () => {
    console.log('⚡️ Server listening on http://localhost:%d', PORT);
});