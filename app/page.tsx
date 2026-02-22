import Link from "next/link";
import { ArrowRight, Box, CornerUpRight, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

import { SiteHeader } from "@/components/site-header";
import { MarketingFooter } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";
import { VercelHeaderMark } from "@/components/vercel-logo";

const SAMPLE_HREF = "/sample";

function ArrowCircleLink({ className }: { className?: string }) {
  return (
    <Link
      href={SAMPLE_HREF}
      aria-label="Learn more"
      className={[
        "inline-flex h-10 w-10 items-center justify-center rounded-full",
        "bg-white text-[#171717]",
        "shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_2px_2px_rgba(0,0,0,0.04),0_0_0_1px_rgb(250,250,250)]",
        "hover:bg-neutral-50",
        "dark:bg-[#0a0a0a] dark:text-[#ededed]",
        "dark:shadow-[0_0_0_1px_rgba(255,255,255,0.145),0_1px_2px_rgba(0,0,0,0.16),0_0_0_1px_rgb(0,0,0)]",
        "dark:hover:bg-[#111]",
        className ?? "",
      ].join(" ")}
    >
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

function RawSvg({
  svg,
  className,
  style,
}: {
  svg: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={className}
      style={style}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

function StoriesTabs() {
  const items = ["AI Apps", "Web Apps", "Ecommerce", "Marketing", "Platforms"];
  const active = items[0];

  return (
    <div className="flex flex-col items-center justify-center lg:items-start">
      <div className="flex h-10 rounded-[32px] border border-[#ebebeb] bg-[#fafafa] dark:border-[#1f1f1f] dark:bg-black">
        {items.map((label) => {
          const isActive = label === active;
          return (
            <Link
              key={label}
              href={SAMPLE_HREF}
              aria-selected={isActive}
              className="relative inline-flex h-10 items-center justify-center rounded-[64px] px-4 text-[14px] font-medium text-black dark:text-[#ededed]"
            >
              {isActive ? (
                <span className="pointer-events-none absolute inset-0 rounded-[64px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:bg-[#0a0a0a]" />
              ) : null}
              <span className="relative z-10">{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function DeliveredTile({
  title,
  description,
  children,
  className,
  headerClassName,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  headerClassName?: string;
}) {
  return (
    <div
      className={[
        "flex min-h-[304px] flex-col bg-[#fafafa] dark:bg-black",
        className ?? "",
      ].join(" ")}
    >
      <header className={["p-6 lg:p-11 lg:pb-0", headerClassName ?? ""].join(" ")}>
        <h3 className="text-balance text-[24px] font-semibold leading-8 tracking-[-0.96px] text-[#171717] dark:text-white">
          {title}
        </h3>
        {description ? (
          <p className="mt-1 text-[14px] leading-5 text-[#666666] dark:text-white/60">
            {description}
          </p>
        ) : null}
      </header>
      {children ? <div className="flex-1">{children}</div> : null}
    </div>
  );
}

function FrameworkFlow() {
  const svelte = `<svg data-testid="geist-icon" height="16" stroke-linejoin="round" style="color:currentColor" viewBox="0 0 16 16" width="16"><path d="M13.7974 2.11525C12.3195 -0.0135593 9.37709 -0.637288 7.26183 0.705085L3.53302 3.09153C2.51607 3.72881 1.81098 4.77288 1.60759 5.95254C1.43132 6.94237 1.58048 7.95932 2.05505 8.84068C1.72963 9.32881 1.51268 9.87119 1.41776 10.4407C1.20082 11.6475 1.48556 12.8949 2.19065 13.8847C3.68217 16.0136 6.61098 16.6373 8.72624 15.2949L12.4551 12.922C13.472 12.2847 14.1771 11.2407 14.3805 10.061C14.5567 9.07119 14.4076 8.05424 13.933 7.17288C14.2584 6.68475 14.4754 6.14237 14.5703 5.57288C14.8008 4.35254 14.5161 3.10508 13.7974 2.11525Z" fill="#FF3E00"></path><path d="M6.8958 14.0881C5.68902 14.4 4.428 13.9254 3.72292 12.9085C3.28902 12.3119 3.12631 11.5661 3.24834 10.8339C3.27546 10.7119 3.30258 10.6034 3.3297 10.4814L3.3975 10.2644L3.58733 10.4C4.03478 10.7254 4.52292 10.9695 5.05173 11.1322L5.18733 11.1729L5.17377 11.3085C5.16021 11.4983 5.21445 11.7017 5.32292 11.8644C5.53987 12.1763 5.91953 12.3254 6.28563 12.2305C6.36699 12.2034 6.44834 12.1763 6.51614 12.1356L10.2314 9.76271C10.4212 9.64068 10.5433 9.46441 10.5839 9.24746C10.6246 9.03051 10.5704 8.8 10.4483 8.62373C10.2314 8.31186 9.85173 8.17627 9.48563 8.27119C9.40428 8.29831 9.32292 8.32542 9.25512 8.3661L7.83139 9.27458C7.60089 9.42373 7.34326 9.5322 7.07207 9.6C5.86529 9.91187 4.60428 9.43729 3.89919 8.42034C3.47885 7.82373 3.30258 7.07797 3.43817 6.34576C3.56021 5.64068 3.99411 5.00339 4.60428 4.62373L8.33309 2.25085C8.5636 2.1017 8.82123 1.99322 9.09241 1.91186C10.2992 1.6 11.5602 2.07458 12.2653 3.09153C12.6992 3.68814 12.8619 4.4339 12.7399 5.1661C12.7128 5.28814 12.6856 5.39661 12.645 5.51864L12.5772 5.73559L12.3873 5.6C11.9399 5.27458 11.4517 5.03051 10.9229 4.8678L10.7873 4.82712L10.8009 4.69153C10.8144 4.50169 10.7602 4.29831 10.6517 4.13559C10.4348 3.82373 10.0551 3.68814 9.68902 3.78305C9.60767 3.81017 9.52631 3.83729 9.45851 3.87797L5.74326 6.25085C5.55343 6.37288 5.43139 6.54915 5.39072 6.7661C5.35004 6.98305 5.40428 7.21356 5.52631 7.38983C5.74326 7.7017 6.12292 7.83729 6.48902 7.74237C6.57038 7.71525 6.65173 7.68814 6.71953 7.64746L8.14326 6.73898C8.37377 6.58983 8.63139 6.48136 8.90258 6.4C10.1094 6.08814 11.3704 6.56271 12.0755 7.57966C12.5094 8.17627 12.6721 8.92203 12.55 9.65424C12.428 10.3593 11.9941 10.9966 11.3839 11.3763L7.65512 13.7492C7.42461 13.8983 7.16699 14.0068 6.8958 14.0881Z" fill="white"></path></svg>`;

  const vite = `<svg data-testid="geist-icon" height="16" stroke-linejoin="round" style="color:currentColor" viewBox="0 0 16 16" width="16"><g clip-path="url(#clip0_872_3154)"><path d="M15.5957 2.32291L8.41532 15.1627C8.26707 15.4278 7.88619 15.4294 7.73571 15.1656L0.41293 2.32415C0.248995 2.03667 0.494822 1.68845 0.820594 1.74668L8.00869 3.03151C8.05454 3.0397 8.10149 3.03963 8.14734 3.03127L15.1851 1.74852C15.5098 1.68934 15.7568 2.03487 15.5957 2.32291Z" fill="url(#paint0_linear_872_3154__S_1_)"></path><path d="M11.4327 0.0614385L6.11901 1.10264C6.03167 1.11975 5.96701 1.19377 5.96174 1.28259L5.63487 6.80312C5.62719 6.93315 5.7466 7.03407 5.87351 7.0048L7.35292 6.66337C7.49134 6.63145 7.61641 6.75336 7.58797 6.89256L7.14843 9.04488C7.11885 9.18974 7.25485 9.3136 7.39632 9.27063L8.31007 8.99301C8.45173 8.95001 8.58785 9.07422 8.55788 9.2192L7.85938 12.6C7.81567 12.8115 8.09696 12.9268 8.21427 12.7455L8.29263 12.6244L12.6225 3.9833C12.695 3.83861 12.57 3.67364 12.4111 3.7043L10.8883 3.9982C10.7452 4.02579 10.6234 3.89253 10.6638 3.75252L11.6577 0.306999C11.6982 0.166755 11.576 0.0333714 11.4327 0.0614385Z" fill="url(#paint1_linear_872_3154__S_1_)"></path></g><defs><linearGradient id="paint0_linear_872_3154__S_1_" x1="0.234138" y1="1.2878" x2="9.17072" y2="13.4244" gradientUnits="userSpaceOnUse"><stop stop-color="#41D1FF"></stop><stop offset="1" stop-color="#BD34FE"></stop></linearGradient><linearGradient id="paint1_linear_872_3154__S_1_" x1="7.59608" y1="0.344123" x2="9.21267" y2="11.4337" gradientUnits="userSpaceOnUse"><stop stop-color="#FFEA83"></stop><stop offset="0.0833333" stop-color="#FFDD35"></stop><stop offset="1" stop-color="#FFA800"></stop></linearGradient><clipPath id="clip0_872_3154"><rect width="16" height="16" fill="white"></rect></clipPath></defs></svg>`;

  const next = `<svg data-testid=\"geist-icon\" height=\"16\" stroke-linejoin=\"round\" style=\"color:currentColor\" viewBox=\"0 0 16 16\" width=\"16\"><g clip-path=\"url(#clip0_53_108)\"><circle cx=\"8\" cy=\"8\" r=\"7.375\" fill=\"black\" stroke=\"var(--ds-gray-1000)\" strokewidth=\"1.25\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></circle><path d=\"M10.63 11V5\" stroke=\"url(#paint0_linear_53_108_S_2_)\" strokewidth=\"1.25\" stroke-miterlimit=\"1.41421\"></path><path fill-rule=\"evenodd\" cliprule=\"evenodd\" d=\"M5.995 5.00087V5H4.745V11H5.995V6.96798L12.3615 14.7076C12.712 14.4793 13.0434 14.2242 13.353 13.9453L5.99527 5.00065L5.995 5.00087Z\" fill=\"url(#paint1_linear_53_108_S_2_)\"></path></g><defs><linearGradient id=\"paint0_linear_53_108_S_2_\" x1=\"11.13\" y1=\"5\" x2=\"11.13\" y2=\"11\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"white\"></stop><stop offset=\"0.609375\" stop-color=\"white\" stop-opacity=\"0.57\"></stop><stop offset=\"0.796875\" stop-color=\"white\" stop-opacity=\"0\"></stop><stop offset=\"1\" stop-color=\"white\" stop-opacity=\"0\"></stop></linearGradient><linearGradient id=\"paint1_linear_53_108_S_2_\" x1=\"9.9375\" y1=\"9.0625\" x2=\"13.5574\" y2=\"13.3992\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"white\"></stop><stop offset=\"1\" stop-color=\"white\" stop-opacity=\"0\"></stop></linearGradient><clipPath id=\"clip0_53_108\"><rect width=\"16\" height=\"16\" fill=\"red\"></rect></clipPath></defs></svg>`;

  const nuxt = `<svg data-testid=\"geist-icon\" height=\"16\" stroke-linejoin=\"round\" style=\"color:currentColor\" viewBox=\"0 0 16 16\" width=\"16\"><path d=\"M8.97614 13.3333H14.924C15.1129 13.3333 15.2985 13.2841 15.4621 13.1905C15.6257 13.0968 15.7616 12.9621 15.856 12.8C15.9504 12.6378 16.0001 12.4538 16 12.2666C15.9999 12.0794 15.9501 11.8955 15.8555 11.7334L11.8611 4.87625C11.7667 4.71411 11.6309 4.57946 11.4673 4.48585C11.3037 4.39225 11.1182 4.34295 10.9293 4.34295C10.7404 4.34295 10.5549 4.39225 10.3913 4.48585C10.2277 4.57946 10.0919 4.71411 9.99751 4.87625L8.97614 6.63074L6.97922 3.19987C6.88473 3.03776 6.74885 2.90313 6.58524 2.80953C6.42162 2.71594 6.23604 2.66666 6.04713 2.66666C5.85822 2.66666 5.67264 2.71594 5.50903 2.80953C5.3454 2.90313 5.20953 3.03776 5.11504 3.19987L0.144471 11.7334C0.0499099 11.8955 8.22996e-05 12.0794 1.01863e-07 12.2666C-8.20958e-05 12.4538 0.0495838 12.6378 0.144003 12.8C0.238421 12.9621 0.374263 13.0968 0.537867 13.1905C0.701468 13.2841 0.887063 13.3333 1.07598 13.3333H4.80956C6.28885 13.3333 7.37977 12.6893 8.13042 11.4329L9.95287 8.3048L10.929 6.63074L13.8586 11.6593H9.95287L8.97614 13.3333ZM4.74869 11.6575L2.14313 11.657L6.04887 4.95264L7.99769 8.3048L6.69287 10.5453C6.19436 11.3605 5.62804 11.6575 4.74869 11.6575Z\" fill=\"#00DC82\"></path></svg>`;

  const icon5 = `<svg data-testid=\"geist-icon\" height=\"16\" stroke-linejoin=\"round\" style=\"color:currentColor\" viewBox=\"0 0 16 16\" width=\"16\"><g clip-path=\"url(#clip0_872_3187)\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.26824e-06 2.99332C2.42358e-06 2.99555 0 2.99777 0 3V13C0 13.6479 0.205396 14.2479 0.554626 14.7383L2.03387 13.259C2.01178 13.1764 2 13.0896 2 13V8H7.26824e-06V2.99332ZM8.00001 2H13C13.5523 2 14 2.44772 14 3V13C14 13.5523 13.5523 14 13 14H8.50001V16H13C14.6569 16 16 14.6569 16 13V3C16 1.34315 14.6569 0 13 0H8.00001V2ZM7.50001 16V14H3C2.91042 14 2.82359 13.9882 2.74098 13.9661L1.26173 15.4454C1.75214 15.7946 2.35208 16 3 16H7.50001Z\" fill=\"url(#paint0_linear_872_3187)\"></path><mask id=\"path-2-inside-1_872_3187\" fill=\"white\"><rect x=\"3.5\" y=\"3.5\" width=\"9\" height=\"9\" rx=\"0.5\"></rect></mask><rect x=\"3.5\" y=\"3.5\" width=\"9\" height=\"9\" rx=\"0.5\" stroke=\"var(--ds-gray-1000)\" fill=\"transparent\" stroke-width=\"4\" mask=\"url(#path-2-inside-1_872_3187)\"></rect></g><defs><linearGradient id=\"paint0_linear_872_3187\" x1=\"8.68832\" y1=\"1.98437\" x2=\"1.79792\" y2=\"8.82805\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#0096FF\"></stop><stop offset=\"1\" stop-color=\"#FF1E56\"></stop></linearGradient><clipPath id=\"clip0_872_3187\"><rect width=\"16\" height=\"16\" fill=\"white\"></rect></clipPath></defs></svg>`;

  const vercelCircle = `<svg data-testid=\"geist-icon\" height=\"16\" stroke-linejoin=\"round\" style=\"color:currentColor\" viewBox=\"0 0 16 16\" width=\"16\"><g clip-path=\"url(#clip0_872_3186)\"><circle cx=\"8\" cy=\"8\" r=\"7.25\" fill=\"currentColor\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></circle><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8 4.5L11.5 10.625H4.5L8 4.5Z\" fill=\"var(--ds-gray-100)\"></path></g><defs><clipPath id=\"clip0_872_3186\"><rect width=\"16\" height=\"16\" fill=\"white\"></rect></clipPath></defs></svg>`;

  const twistedBlue = `<svg class=\"framework-defined-infra-flow-module___hak3G__twistedLine framework-defined-infra-flow-module___hak3G__blue\" fill=\"none\" height=\"75\" preserveAspectRatio=\"none\" viewBox=\"0 0 96 75\" width=\"96\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 74v0a57.893 57.893 0 0051.922-32.287l9.463-19.188A38.595 38.595 0 0196 1v0\" stroke=\"currentColor\" stroke-width=\"2\" vector-effect=\"non-scaling-stroke\"></path></svg>`;
  const twistedRed = twistedBlue.replace(/__blue/g, "__red");
  const twistedAmber = twistedBlue.replace(/__blue/g, "__amber");
  const twistedGreen = twistedBlue.replace(/__blue/g, "__green");

  const featureImage = `<svg data-testid=\"geist-icon\" height=\"16\" stroke-linejoin=\"round\" style=\"color:currentColor\" viewBox=\"0 0 16 16\" width=\"16\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M14.5 2.5H1.5V9.18933L2.96966 7.71967L3.18933 7.5H3.49999H6.63001H6.93933L6.96966 7.46967L10.4697 3.96967L11.5303 3.96967L14.5 6.93934V2.5ZM8.00066 8.55999L9.53034 10.0897L10.0607 10.62L9.00001 11.6807L8.46968 11.1503L6.31935 9H3.81065L1.53032 11.2803L1.5 11.3106V12.5C1.5 13.0523 1.94772 13.5 2.5 13.5H13.5C14.0523 13.5 14.5 13.0523 14.5 12.5V9.06066L11 5.56066L8.03032 8.53033L8.00066 8.55999ZM4.05312e-06 10.8107V12.5C4.05312e-06 13.8807 1.11929 15 2.5 15H13.5C14.8807 15 16 13.8807 16 12.5V9.56066L16.5607 9L16.0303 8.46967L16 8.43934V2.5V1H14.5H1.5H4.05312e-06V2.5V10.6893L-0.0606689 10.75L4.05312e-06 10.8107Z\" fill=\"currentColor\"></path></svg>`;
  const featureFx = `<svg data-testid=\"geist-icon\" height=\"16\" stroke-linejoin=\"round\" style=\"color:currentColor\" viewBox=\"0 0 16 16\" width=\"16\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.5 1.5H2.5V13.5C2.5 14.0523 2.94772 14.5 3.5 14.5H12.5C13.0523 14.5 13.5 14.0523 13.5 13.5V1.5ZM2.5 0H1V1.5V13.5C1 14.8807 2.11929 16 3.5 16H12.5C13.8807 16 15 14.8807 15 13.5V1.5V0H13.5H2.5ZM9.75 4.5C9.19772 4.5 8.75 4.94772 8.75 5.5V6.5H9.75H10.5V8H9.75H8.75V10.5C8.75 11.8807 7.63071 13 6.25 13H5.5V11.5H6.25C6.80228 11.5 7.25 11.0523 7.25 10.5V8H6.25H5.5V6.5H6.25H7.25V5.5C7.25 4.11929 8.36929 3 9.75 3H10.5V4.5H9.75Z\" fill=\"currentColor\"></path></svg>`;
  const featureLayers = `<svg data-testid=\"geist-icon\" height=\"16\" stroke-linejoin=\"round\" style=\"color:currentColor\" viewBox=\"0 0 16 16\" width=\"16\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0 5.25136V4.2487L0.463236 4.05702L7.71324 1.05702L8 0.938354L8.28676 1.05702L15.5368 4.05702L16 4.2487V5.25136L15.5368 5.44304L8.28676 8.44304L8 8.5617L7.71324 8.44304L0.463236 5.44304L0 5.25136ZM0 8.45825V6.83491L0.536764 7.05702L8 10.1453L15.4632 7.05702L16 6.83491V8.45825L8.28676 11.6499L8 11.7686L7.71324 11.6499L0 8.45825ZM0 11.7083V10.0849L0.536764 10.307L8 13.3953L15.4632 10.307L16 10.0849V11.7083L8.28676 14.8999L8 15.0186L7.71324 14.8999L0 11.7083ZM8 6.93835L2.71154 4.75003L8 2.5617L13.2885 4.75003L8 6.93835Z\" fill=\"currentColor\"></path></svg>`;
  const featureDb = `<svg data-testid=\"geist-icon\" height=\"16\" stroke-linejoin=\"round\" style=\"color:currentColor\" viewBox=\"0 0 16 16\" width=\"16\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.30204 0.785875C4.54182 0.289965 6.20312 0 8 0C9.79688 0 11.4582 0.289965 12.698 0.785875C13.3158 1.033 13.8661 1.34602 14.2742 1.73197C14.6839 2.11942 15 2.63215 15 3.25V8V12.75C15 13.3679 14.6839 13.8806 14.2742 14.268C13.8661 14.654 13.3158 14.967 12.698 15.2141C11.4582 15.71 9.79688 16 8 16C6.20312 16 4.54182 15.71 3.30204 15.2141C2.68423 14.967 2.13394 14.654 1.72583 14.268C1.31613 13.8806 1 13.3679 1 12.75V8V3.25C1 2.63215 1.31613 2.11942 1.72583 1.73197C2.13394 1.34602 2.68423 1.033 3.30204 0.785875ZM2.5 5.33081V8C2.5 8.0725 2.53365 8.21745 2.75649 8.4282C2.98091 8.64044 3.34591 8.86612 3.85913 9.07141C4.8814 9.48032 6.3451 9.75 8 9.75C9.6549 9.75 11.1186 9.48032 12.1409 9.07141C12.6541 8.86612 13.0191 8.64044 13.2435 8.4282C13.4664 8.21745 13.5 8.0725 13.5 8V5.33081C13.2518 5.47297 12.982 5.60051 12.698 5.71412C11.4582 6.21004 9.79688 6.5 8 6.5C6.20312 6.5 4.54182 6.21004 3.30204 5.71412C3.018 5.60051 2.74824 5.47297 2.5 5.33081ZM13.5 3.25C13.5 3.3225 13.4664 3.46746 13.2435 3.6782C13.0191 3.89044 12.6541 4.11612 12.1409 4.32141C11.1186 4.73032 9.6549 5 8 5C6.3451 5 4.8814 4.73032 3.85913 4.32141C3.34591 4.11612 2.98091 3.89044 2.75649 3.6782C2.53365 3.46746 2.5 3.3225 2.5 3.25C2.5 3.1775 2.53365 3.03254 2.75649 2.8218C2.98091 2.60956 3.34591 2.38388 3.85913 2.17859C4.8814 1.76968 6.3451 1.5 8 1.5C9.6549 1.5 11.1186 1.76968 12.1409 2.17859C12.6541 2.38388 13.0191 2.60956 13.2435 2.8218C13.4664 3.03254 13.5 3.1775 13.5 3.25ZM13.5 10.0808C13.2518 10.223 12.982 10.3505 12.698 10.4641C11.4582 10.96 9.79688 11.25 8 11.25C6.20312 11.25 4.54182 10.96 3.30204 10.4641C3.018 10.3505 2.74824 10.223 2.5 10.0808V12.75C2.5 12.8225 2.53365 12.9675 2.75649 13.1782C2.98091 13.3904 3.34591 13.6161 3.85913 13.8214C4.8814 14.2303 6.3451 14.5 8 14.5C9.6549 14.5 11.1186 14.2303 12.1409 13.8214C12.6541 13.6161 13.0191 13.3904 13.2435 13.1782C13.4664 12.9675 13.5 12.8225 13.5 12.75V10.0808Z\" fill=\"currentColor\"></path></svg>`;

  return (
    <div className="relative h-[287px] w-full bg-white dark:bg-black">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
          opacity: 0.25,
        }}
      />

      <div className="absolute left-[44px] top-[44px] h-[200px] w-10 rounded-full border border-[#ebebeb] bg-white/90 dark:border-[#1f1f1f] dark:bg-black/70" />

      <RawSvg svg={svelte} style={{ position: "absolute", left: 57, top: 59 }} />
      <RawSvg svg={vite} style={{ position: "absolute", left: 57, top: 97 }} />
      <RawSvg svg={next} style={{ position: "absolute", left: 57, top: 135 }} />
      <RawSvg svg={nuxt} style={{ position: "absolute", left: 57, top: 173 }} />
      <RawSvg svg={icon5} style={{ position: "absolute", left: 57, top: 211 }} />

      <div
        className="absolute rounded-2xl border border-[#ebebeb] bg-white shadow-[0_2px_2px_rgba(0,0,0,0.04)] dark:border-[#1f1f1f] dark:bg-black dark:shadow-[0_2px_2px_rgba(0,0,0,0.24)]"
        style={{ left: 125, top: 108, width: 72, height: 72 }}
      />
      <RawSvg
        svg={vercelCircle}
        className="text-[#171717] dark:text-[#ededed]"
        style={{ position: "absolute", left: 145, top: 128 }}
      />

      <div
        className="absolute h-px bg-[#a1a1a1] dark:bg-[#3a3a3a]"
        style={{ left: 84, top: 144, width: 41 }}
      />

      <RawSvg
        svg={twistedBlue}
        className="text-[#52aeff] dark:text-[#0091ff]"
        style={{ position: "absolute", left: 192, top: 58 }}
      />
      <RawSvg
        svg={twistedRed}
        className="text-[#e5484d]"
        style={{ position: "absolute", left: 192, top: 116 }}
      />
      <RawSvg
        svg={twistedAmber}
        className="text-[#ffb224]"
        style={{ position: "absolute", left: 192, top: 148 }}
      />
      <RawSvg
        svg={twistedGreen}
        className="text-[#45dec5] dark:text-[#0c9784]"
        style={{ position: "absolute", left: 192, top: 156 }}
      />

      {[
        { svg: featureImage, y: 49 },
        { svg: featureFx, y: 107 },
        { svg: featureLayers, y: 164 },
        { svg: featureDb, y: 222 },
      ].map((item) => (
        <div
          key={item.y}
          className="absolute grid h-10 w-10 place-items-center rounded-xl border border-[#ebebeb] bg-white shadow-[0_2px_2px_rgba(0,0,0,0.04)] dark:border-[#1f1f1f] dark:bg-black dark:shadow-[0_2px_2px_rgba(0,0,0,0.24)]"
          style={{ left: 270, top: item.y - 9 }}
        >
          <RawSvg
            svg={item.svg}
            className="text-[#666666] dark:text-[#a1a1a1]"
          />
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--geist-background)] text-[var(--geist-foreground)]">
      <SiteHeader />

      <main className="px-4">
        <section className="pt-16" data-slot="vercel-hero">
          <div className="mx-auto max-w-[1080px]">
            <div className="relative h-[720px] overflow-hidden rounded-none border border-neutral-200 bg-[#fafafa] dark:border-white/10 dark:bg-black">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10 opacity-60 dark:hidden"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
                  backgroundSize: "90px 90px",
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10 hidden opacity-60 dark:block"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
                  backgroundSize: "90px 90px",
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-4 z-20 h-4 w-4 opacity-40 dark:opacity-30"
              >
                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-neutral-400 dark:bg-white/40" />
                <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-neutral-400 dark:bg-white/40" />
              </div>

              <div className="relative z-20 flex h-full flex-col items-center px-6 pt-36 text-center">
                <h1 className="text-balance text-[56px] font-semibold leading-[1.05] tracking-tight text-neutral-900 dark:text-white">
                  Build and deploy on the AI Cloud.
                </h1>
                <p className="mt-6 max-w-2xl text-balance text-lg leading-7 text-neutral-600 dark:text-white/70">
                  Vercel provides the developer tools and cloud infrastructure
                  to build, scale, and secure a faster, more personalized web.
                </p>

                <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                  <Button
                    asChild
                    className="h-12 w-full bg-[#171717] px-3.5 text-[16px] font-medium leading-6 text-white hover:bg-black sm:w-[181px] dark:bg-[#ededed] dark:text-[#0a0a0a] dark:hover:bg-white/90"
                  >
                    <Link href={SAMPLE_HREF}>
                      <VercelHeaderMark className="h-4 w-auto" />
                      Start Deploying
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="h-12 w-full bg-white px-3.5 text-[16px] font-medium leading-6 text-[#171717] shadow-[0_0_0_1px_rgba(0,0,0,0.08)] hover:bg-neutral-50 sm:w-[181px] dark:bg-[#0a0a0a] dark:text-[#ededed] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.14)] dark:hover:bg-[#111]"
                  >
                    <Link href={SAMPLE_HREF}>Get a Demo</Link>
                  </Button>
                </div>
              </div>

              <div
                aria-hidden="true"
                className="absolute inset-0 z-0 overflow-hidden"
              >
                <div
                  className="absolute inset-0 z-0 dark:hidden"
                  aria-hidden="true"
                  style={{
                    backgroundImage:
                      "conic-gradient(from 180deg at 50% 70%, rgba(250, 250, 250, 0) 0deg, rgb(238, 195, 45) 72deg, rgb(236, 75, 75) 144deg, rgb(112, 154, 185) 216deg, rgb(77, 255, 191) 288deg, rgba(250, 250, 250, 0) 360deg)",
                    mixBlendMode: "hard-light",
                  }}
                />
                <div
                  className="absolute inset-0 z-0 hidden dark:block"
                  aria-hidden="true"
                  style={{
                    backgroundImage:
                      "conic-gradient(from 180deg at 50% 70%, rgba(0, 0, 0, 0) 0deg, rgba(0, 89, 171, 0.8) 72deg, rgba(15, 255, 169, 0.8) 144deg, rgba(255, 206, 32, 0.8) 216deg, rgba(197, 0, 0, 0.8) 288deg, rgba(0, 0, 0, 0) 360deg)",
                    mixBlendMode: "hard-light",
                  }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/vercel-hero-0.svg"
                  alt=""
                  className="absolute inset-0 z-10 h-full w-full dark:hidden"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/vercel-hero-1.svg"
                  alt=""
                  className="absolute inset-0 z-10 h-full w-full dark:hidden"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/vercel-hero-0-dark.svg"
                  alt=""
                  className="absolute inset-0 z-10 hidden h-full w-full dark:block"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/vercel-hero-1-dark.svg"
                  alt=""
                  className="absolute inset-0 z-10 hidden h-full w-full dark:block"
                />
                <div
                  className="absolute inset-0 z-20 dark:hidden"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(250,250,250,1) 0%, rgba(250,250,250,1) 46%, rgba(250,250,250,0) 72%)",
                  }}
                />
                <div
                  className="absolute inset-0 z-20 hidden dark:block"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 46%, rgba(0,0,0,0) 72%)",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="pt-0">
          <div className="mx-auto max-w-[1080px] border-x border-[#ebebeb] dark:border-[#1f1f1f]">
            <div className="grid md:grid-cols-[359px_359px_359px]">
              <div className="md:col-span-2 md:border-r md:border-[#ebebeb] md:dark:border-[#1f1f1f]">
                <div className="p-6 lg:p-11">
                  <div className="text-balance text-[32px] leading-[48px] tracking-[-1.28px]">
                    <div className="text-[#666666]">
                      <span className="font-semibold text-[#171717] dark:text-white">
                        runway
                      </span>{" "}
                      build times went from 7m to 40s.
                    </div>
                    <div className="mt-2 text-[#666666]">
                      <span className="font-medium text-[#171717] dark:text-white">
                        Leonardo.Ai
                      </span>{" "}
                      saw a 95% reduction in page load times.
                      <span className="font-semibold text-[#171717] dark:text-white">
                        {" "}
                        zapier
                      </span>{" "}
                      saw 24x faster builds.
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 lg:p-11">
                <p className="text-[16px] leading-6 text-[#666666] dark:text-white/60">
                  Get started using our pre-built templates. Easily stream
                  long-running LLM responses for a better user experience with
                  zero-config infrastructure that’s always globally performant.
                </p>
              </div>

              <div className="border-t border-[#ebebeb] p-6 lg:px-11 lg:py-7 dark:border-[#1f1f1f] md:col-span-2 md:border-r md:border-[#ebebeb] md:dark:border-[#1f1f1f]">
                <StoriesTabs />
              </div>
              <div className="border-t border-[#ebebeb] p-6 lg:px-11 lg:py-7 dark:border-[#1f1f1f]">
                <Link
                  href={SAMPLE_HREF}
                  className="inline-flex h-10 w-[263px] items-center justify-between rounded-full bg-[#171717] px-2.5 text-[14px] font-medium leading-5 text-white shadow-[0_2px_2px_rgba(0,0,0,0.04)] hover:bg-black dark:bg-[#ededed] dark:text-[#0a0a0a] dark:hover:bg-white/90"
                >
                  <span>Deploy AI Apps in seconds</span>
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-white dark:bg-black/10 dark:text-[#0a0a0a]">
                    <Sparkles className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </div>
            </div>

            <div className="border-t border-[#ebebeb] dark:border-[#1f1f1f]">
              <div className="grid md:grid-cols-[359px_359px_359px]">
                <div className="min-h-[304px] bg-[#fafafa] p-6 lg:p-11 dark:bg-black">
                  <h3 className="text-balance text-[32px] font-semibold leading-10 tracking-[-1.28px] text-[#171717] dark:text-white">
                    Your product,
                    <br />
                    delivered.
                  </h3>
                  <p className="mt-2 text-[18px] leading-7 text-[#666666] dark:text-white/60">
                    Security, speed, and AI included, so you can focus on your
                    user.
                  </p>
                </div>

                <div className="border-t border-[#ebebeb] dark:border-[#1f1f1f] md:border-t-0 md:border-l md:border-[#ebebeb] md:dark:border-[#1f1f1f]">
                  <DeliveredTile
                    title="Agents"
                    description="Deliver more value to users by executing complex workflows."
                  >
                    <div className="px-6 pb-6 lg:px-11 lg:pb-11">
                      <div className="mt-4">
                        <ArrowCircleLink />
                      </div>
                      <div className="mt-8 rounded-xl border border-[#ebebeb] bg-white p-4 dark:border-[#1f1f1f] dark:bg-black">
                        <div className="flex items-center gap-2 text-[14px] leading-5 text-[#666666] dark:text-white/60">
                          <span className="h-4 w-4 rounded-full border border-[#ebebeb] dark:border-[#1f1f1f]" />
                          Thinking...
                        </div>
                        <div className="mt-3 flex h-10 items-center justify-between rounded-lg border border-[#ebebeb] bg-[#fafafa] px-3 dark:border-[#1f1f1f] dark:bg-black">
                          <span className="text-[14px] text-[#666666] dark:text-white/40">
                            {" "}
                          </span>
                          <span className="grid h-6 w-6 place-items-center rounded-md bg-[#0b5cff] text-white">
                            <CornerUpRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </DeliveredTile>
                </div>

                <div className="border-t border-[#ebebeb] dark:border-[#1f1f1f] md:border-t-0 md:border-l md:border-[#ebebeb] md:dark:border-[#1f1f1f]">
                  <DeliveredTile
                    title="AI Apps"
                    description="Enrich any product or feature with the latest models and tools."
                  >
                    <div className="px-6 pb-6 lg:px-11 lg:pb-11">
                      <div className="mt-4">
                        <ArrowCircleLink />
                      </div>
                      <div className="mt-8 grid gap-2">
                        <div className="grid grid-cols-3 gap-2">
                          {["Fluid", "AI SDK", "AI Gateway"].map((chip) => (
                            <div
                              key={chip}
                              className="h-10 rounded-lg bg-white px-3 text-[12px] font-medium leading-10 text-[#171717] shadow-[0_0_0_1px_rgba(0,0,0,0.08)] dark:bg-[#0a0a0a] dark:text-[#ededed] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.14)]"
                            >
                              {chip}
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {["Workflow", "Sandbox", "BotID"].map((chip) => (
                            <div
                              key={chip}
                              className="h-10 rounded-lg bg-white px-3 text-[12px] font-medium leading-10 text-[#666666] shadow-[0_0_0_1px_rgba(0,0,0,0.08)] dark:bg-[#0a0a0a] dark:text-[#ededed]/70 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.14)]"
                            >
                              {chip}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DeliveredTile>
                </div>

                <div className="border-t border-[#ebebeb] dark:border-[#1f1f1f] md:col-span-3">
                  <div className="grid md:grid-cols-[359px_359px_359px]">
                    <div className="border-b border-[#ebebeb] bg-[#fafafa] dark:border-[#1f1f1f] dark:bg-black md:border-b-0 md:border-r md:border-[#ebebeb] md:dark:border-[#1f1f1f]">
                      <DeliveredTile
                        title="Web Apps"
                        description="Ship beautiful interfaces that don’t compromise speed or functionality."
                        headerClassName="lg:pb-6"
                      >
                        <div className="px-6 pb-6 lg:px-11 lg:pb-11">
                          <div className="mt-4">
                            <ArrowCircleLink />
                          </div>
                          <div className="mt-8">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src="/vercel/delivered-web-apps-min.svg"
                              alt=""
                              className="h-24 w-[268px] dark:hidden"
                            />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src="/vercel/delivered-web-apps-min-dark.svg"
                              alt=""
                              className="hidden h-24 w-[268px] dark:block"
                            />
                          </div>
                        </div>
                      </DeliveredTile>
                    </div>

                    <div className="border-b border-[#ebebeb] bg-[#fafafa] dark:border-[#1f1f1f] dark:bg-black md:border-b-0 md:border-r md:border-[#ebebeb] md:dark:border-[#1f1f1f]">
                      <DeliveredTile
                        title="Composable Commerce"
                        description="Increase conversion with fast, branded storefronts."
                        headerClassName="lg:pb-6"
                      >
                        <div className="px-6 pb-6 lg:px-11 lg:pb-11">
                          <div className="mt-4">
                            <ArrowCircleLink />
                          </div>
                          <div className="mt-8">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src="/vercel/delivered-commerce-min.svg"
                              alt=""
                              className="h-24 w-[268px] dark:hidden"
                            />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src="/vercel/delivered-commerce-min-dark.svg"
                              alt=""
                              className="hidden h-24 w-[268px] dark:block"
                            />
                          </div>
                        </div>
                      </DeliveredTile>
                    </div>

                    <div className="bg-[#fafafa] dark:bg-black">
                      <DeliveredTile
                        title="Multi-tenant Platform"
                        description="Serve millions securely across isolated environments."
                        headerClassName="lg:pb-6"
                      >
                        <div className="px-6 pb-6 lg:px-11 lg:pb-11">
                          <div className="mt-4">
                            <ArrowCircleLink />
                          </div>
                          <div className="mt-8">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src="/vercel/delivered-web-agents-min.svg"
                              alt=""
                              className="h-24 w-[268px] opacity-60 dark:hidden"
                            />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src="/vercel/delivered-web-agents-min-dark.svg"
                              alt=""
                              className="hidden h-24 w-[268px] opacity-60 dark:block"
                            />
                          </div>
                        </div>
                      </DeliveredTile>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#ebebeb] dark:border-[#1f1f1f]">
              <div className="grid md:grid-cols-[359px_720px]">
                <div className="border-b border-[#ebebeb] dark:border-[#1f1f1f] md:border-b-0 md:border-r md:border-[#ebebeb] md:dark:border-[#1f1f1f]">
                  <FrameworkFlow />
                </div>
                <div className="flex flex-col justify-center p-6 lg:p-11">
                  <div className="flex items-center gap-2 text-[14px] font-medium leading-5 tracking-[-0.28px] text-[#666666] dark:text-[#a1a1a1]">
                    <Box className="h-4 w-4" />
                    Framework-Defined Infrastructure
                  </div>
                  <p className="mt-3 text-balance text-[24px] font-medium leading-8 tracking-[-0.96px] text-[#666666] dark:text-[#a1a1a1]">
                    <span className="font-semibold text-[#171717] dark:text-[#ededed]">
                      From code to infrastructure in one git push.
                    </span>{" "}
                    Vercel deeply understands your app to provision the right
                    resources and optimize for high-performance apps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
