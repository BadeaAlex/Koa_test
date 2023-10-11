const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const path = require('path');
const render = require('koa-ejs');

const app = new Koa();
const router = new KoaRouter();

// Things
const things = ['My Family', 'Programming', 'Music'];

// JSON middleware
app.use(json());

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: true,

});


// Routes
router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add);

// List of things
async function index(ctx) {
  await ctx.render('index', {
    title: 'Things I Love:',
    things: things
  });
}

// Show add page
async function showAdd(ctx) {
  await ctx.render('add');
}

// Add a new thing
async function add(ctx) {
  const body = ctx.request.body;
  things.push(body.thing);
  ctx.redirect('/');
}

// Test route
router.get('/test', ctx => (ctx.body = 'Hello Test'));

// Router middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('Server running on port 3000'));
