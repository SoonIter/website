import { normalizeImagePath } from "@rspress/core/runtime";
import {
  HomeFooter,
  Link,
  type HomeLayoutProps,
} from "@rspress/core/theme-original";

import "./index.css";
import { useNavTransparent } from "./useNavTransparent";

const HOME = {
  name: "SWC",
  title: "Rust-based platform for the Web",
  tagline:
    "SWC is an extensible Rust-based platform for the next generation of fast developer tools. 20x faster than Babel on a single thread, 70x faster on four cores.",
  image: "/logo.png",
  actions: [
    {
      text: "Get Started",
      link: "/docs/getting-started",
      primary: true,
    },
    { text: "Playground", link: "/playground/" },
    { text: "GitHub", link: "https://github.com/swc-project/swc" },
  ],
  features: [
    {
      title: "Compilation",
      details:
        "Takes JavaScript / TypeScript files using modern JavaScript features and outputs valid code that is supported by all major browsers.",
    },
    {
      title: "Minification",
      details: "A fast, Terser-compatible JavaScript minifier written in Rust.",
    },
    {
      title: "WebAssembly",
      details:
        "Transform code with WebAssembly builds — run SWC anywhere JavaScript runs.",
    },
    {
      title: "webpack & Rspack",
      details: "Use swc-loader to speed up builds inside webpack and Rspack.",
    },
    {
      title: "Jest",
      details: "Improve Jest performance dramatically with @swc/jest.",
    },
    {
      title: "Custom Plugins",
      details: "Extend SWC with custom Wasm plugins written in Rust.",
    },
  ],
} as const;

function HomeLayoutMarkdown() {
  const lines = [
    `# ${HOME.name}`,
    "",
    HOME.title,
    "",
    `> ${HOME.tagline}`,
    "",
    HOME.actions
      .map((action) => `[${action.text}](${action.link})`)
      .join(" | "),
    "",
    "## Features",
    "",
    ...HOME.features.map(
      (feature) => `- **${feature.title}**: ${feature.details}`
    ),
  ];

  return <>{lines.join("\n")}</>;
}

export function HomeLayout({
  beforeHero,
  afterHero,
  beforeHeroActions,
  afterHeroActions,
  beforeFeatures,
  afterFeatures,
}: HomeLayoutProps) {
  if (import.meta.env.SSG_MD) {
    return <HomeLayoutMarkdown />;
  }

  const navTransparentStyle = useNavTransparent();
  const logoSrc = normalizeImagePath(HOME.image);

  return (
    <>
      {navTransparentStyle}
      <div className="rp-home-background" />
      <main className="swc-home">
        {beforeHero}
        <section className="swc-home__hero">
          <div className="swc-home__hero-copy">
            <p className="swc-home__name">{HOME.name}</p>
            <h1 className="swc-home__title">{HOME.title}</h1>
            <p className="swc-home__tagline">{HOME.tagline}</p>

            {beforeHeroActions}
            <nav className="swc-home__actions" aria-label="SWC links">
              {HOME.actions.map((action) => (
                <Link
                  key={action.link}
                  href={action.link}
                  className={`swc-home__action${
                    "primary" in action && action.primary
                      ? " swc-home__action--primary"
                      : ""
                  }`}
                >
                  <span>{action.text}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
            </nav>
            {afterHeroActions}
          </div>

          <div className="swc-home__mark" aria-hidden="true">
            <img
              className="swc-home__mark-image swc-home__mark-image--light"
              src={logoSrc}
              alt=""
            />
            <img
              className="swc-home__mark-image swc-home__mark-image--dark"
              src={logoSrc}
              alt=""
            />
          </div>
        </section>
        {afterHero}

        {beforeFeatures}
        <section className="swc-home__features" aria-labelledby="features">
          <h2 id="features" className="swc-home__features-title">
            Core capabilities
          </h2>
          <div className="swc-home__feature-grid">
            {HOME.features.map((feature) => (
              <article key={feature.title} className="swc-home__feature">
                <h3 className="swc-home__feature-title">{feature.title}</h3>
                <p className="swc-home__feature-detail">{feature.details}</p>
              </article>
            ))}
          </div>
        </section>
        {afterFeatures}
      </main>
      <HomeFooter />
    </>
  );
}
