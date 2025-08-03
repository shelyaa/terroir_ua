import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import { GoogleOAuthProvider } from '@react-oauth/google';

const CLIENT_ID = '673751469630-7g3erpg31471h7ms5roehif5rfdd2qol.apps.googleusercontent.com'

createRoot(document.getElementById('root') as HTMLDivElement).render(<GoogleOAuthProvider clientId={CLIENT_ID}><Root /></GoogleOAuthProvider>);
