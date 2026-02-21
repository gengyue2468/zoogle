import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import "./i18n";
import I18nProvider from "./components/i18n-provider";
import { GeoSearchDefault } from "./components/geo-search-default";
import i18n from "./i18n";

export const links: Route.LinksFunction = () => [];

function getCountryFromRequest(request: Request): string | null {
  const h = request.headers;
  return (
    h.get("cf-ipcountry") ??
    h.get("x-vercel-ip-country") ??
    h.get("x-nf-request-country") ??
    null
  );
}

export async function loader({ request }: Route.LoaderArgs) {
  const countryCode = getCountryFromRequest(request);
  return { countryCode: countryCode?.toUpperCase() ?? null };
}

const THEME_SCRIPT = `
(function(){
  try {
    var raw = localStorage.getItem('zoogle-settings');
    if (!raw) return;
    var data = JSON.parse(raw);
    var dark = data.state && data.state.darkMode;
    var root = document.documentElement;
    if (dark === true) { root.className = 'dark'; root.style.colorScheme = 'dark'; }
    else if (dark === false) { root.className = 'light'; root.style.colorScheme = 'light'; }
  } catch(e) {}
})();
`;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={i18n.language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="root">{children}</div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <GeoSearchDefault />
      <Outlet />
    </I18nProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const location = useLocation();
  let code = "Error";
  let line2: React.ReactNode = "An unexpected error occurred.";
  let showThatsAllWeKnow = false;
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    code = error.status === 404 ? "404" : String(error.status);
    if (error.status === 404) {
      const url = location.pathname + location.search;
      line2 = (
        <>
          The requested URL {url} was not found on this server.{" "}
          <span className="text-zoogle-text-secondary">That&apos;s all we know.</span>
        </>
      );
    } else {
      showThatsAllWeKnow = true;
      line2 = error.statusText ? `${error.statusText}.` : null;
    }
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    line2 = error.message;
    stack = error.stack;
  }

  return (
    <div className="min-h-dvh flex flex-col items-center bg-zoogle-bg text-zoogle-text px-8 py-8">
      <div className="max-w-148.75 w-full mx-auto mt-8 md:mt-24">
        <div className="flex flex-row items-start gap-8">
          <div>
            <Link to="/" className="self-start mb-6">
              <h1 className="font-semibold text-4xl" aria-hidden>
                Zoogle
              </h1>
            </Link>
            <p className="mt-8 roboto">
              <span>{code}.</span>{" "}
              <span className="text-zoogle-text-secondary">
                That&apos;s an error.
              </span>
            </p>
            <p className="mt-4 leading-relaxed roboto">
              {line2}
              {showThatsAllWeKnow && (
                <>{" "}
                  <span className="text-zoogle-text-secondary">That&apos;s all we know.</span>
                </>
              )}
            </p>
          </div>
          <div className="hidden md:block">
            <img
              src="/static/robot.png"
              alt="A robot holding a broken cable, representing an error page"
              className="w-full max-w-sm"
            />
          </div>
        </div>
      </div>
      {import.meta.env.DEV && stack && (
        <pre className="mt-10 w-full max-w-2xl p-4 overflow-x-auto text-xs text-zoogle-text-secondary bg-zoogle-surface rounded-xl border border-zoogle-border">
          <code>{stack}</code>
        </pre>
      )}
    </div>
  );
}
