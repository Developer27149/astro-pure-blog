export { renderers } from '../renderers.mjs';

const page = () => import('./pages/index_C5Y-AERP.mjs').then(n => n.d);

export { page };
