import Image from 'next/image'

import { localizedString, PropsWithLocale } from '@/contexts/LocaleProvider'
import { urlFor } from '@/sanity/client'

import Container from '@/components/Container'

import { SanityFeature, SanityFeatureSection } from '../../sanity/types'

export type FeatureSectionProps = {
  data: SanityFeatureSection
}

const mobBgArrowSVG = {
  rightArrow: (
    <svg
      width="233"
      height="61"
      viewBox="0 0 233 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M232.438 60.9407L226.799 59.7031L230.691 55.4381L232.438 60.9407ZM225.037 55.759C223.402 54.7195 221.648 53.7307 219.784 52.7888L220.235 51.8963C222.125 52.8512 223.908 53.8561 225.573 54.9151L225.037 55.759ZM214.289 50.2739C212.48 49.522 210.593 48.8042 208.633 48.1178L208.964 47.1741C210.939 47.8661 212.844 48.5906 214.673 49.3505L214.289 50.2739ZM202.864 46.2465C200.965 45.6756 199.012 45.1288 197.008 44.6043L197.261 43.6369C199.275 44.1642 201.24 44.7142 203.152 45.2889L202.864 46.2465ZM191.084 43.1494C189.152 42.704 187.182 42.276 185.177 41.864L185.378 40.8844C187.391 41.298 189.369 41.7276 191.309 42.175L191.084 43.1494ZM179.222 40.7044C177.25 40.3402 175.249 39.9891 173.223 39.6499L173.388 38.6636C175.42 39.0037 177.426 39.3557 179.404 39.721L179.222 40.7044ZM167.209 38.6878C165.229 38.3849 163.229 38.0917 161.211 37.807L161.351 36.8168C163.373 37.102 165.377 37.3958 167.36 37.6993L167.209 38.6878ZM155.179 36.987C153.178 36.7245 151.162 36.4692 149.134 36.2198L149.256 35.2272C151.286 35.4769 153.305 35.7327 155.309 35.9955L155.179 36.987ZM143.107 35.4991C141.098 35.2653 139.081 35.0363 137.057 34.8111L137.168 33.8173C139.193 34.0426 141.212 34.2718 143.222 34.5058L143.107 35.4991ZM131.006 34.1502C128.993 33.934 126.976 33.7206 124.957 33.5089L125.062 32.5144C127.081 32.7261 129.099 32.9396 131.112 33.1559L131.006 34.1502ZM118.902 32.879C116.884 32.6702 114.865 32.4623 112.849 32.2543L112.952 31.2595C114.968 31.4676 116.986 31.6755 119.005 31.8843L118.902 32.879ZM106.791 31.6266C104.768 31.416 102.751 31.2043 100.74 30.9904L100.846 29.996C102.856 30.2098 104.872 30.4214 106.894 30.632L106.791 31.6266ZM94.6866 30.337C92.6566 30.1141 90.6361 29.888 88.6275 29.6578L88.7414 28.6643C90.7482 28.8944 92.7671 29.1202 94.7957 29.3429L94.6866 30.337ZM82.59 28.9475C80.5588 28.7019 78.5426 28.4507 76.5439 28.193L76.6718 27.2012C78.6676 27.4585 80.6812 27.7094 82.7101 27.9547L82.59 28.9475ZM70.4936 27.3836C68.4646 27.1017 66.4571 26.8115 64.4741 26.5118L64.6236 25.523C66.6023 25.8221 68.6058 26.1117 70.6312 26.3931L70.4936 27.3836ZM58.4693 25.561C56.4282 25.2221 54.4176 24.8712 52.4411 24.5067L52.6225 23.5233C54.5927 23.8866 56.5973 24.2365 58.6331 24.5745L58.4693 25.561ZM46.4514 23.337C44.4265 22.918 42.444 22.4819 40.5079 22.027L40.7366 21.0535C42.6633 21.5062 44.6371 21.9404 46.654 22.3578L46.4514 23.337ZM34.6175 20.5434C32.5971 19.9973 30.638 19.4262 28.7456 18.8275L29.0473 17.8741C30.9248 18.4681 32.8703 19.0353 34.8784 19.578L34.6175 20.5434ZM22.9557 16.8269C20.9773 16.0788 19.0916 15.2918 17.307 14.4623L17.7285 13.5555C19.4884 14.3735 21.3512 15.1511 23.3094 15.8915L22.9557 16.8269ZM11.8837 11.6188C10.0433 10.5245 8.35476 9.36439 6.83281 8.13214L7.46208 7.35494C8.94177 8.55298 10.5899 9.68611 12.3947 10.7592L11.8837 11.6188ZM2.41798 3.77528C1.75988 2.96471 1.16298 2.12745 0.6303 1.26236L1.48183 0.738034C1.99063 1.56435 2.56215 2.36633 3.19433 3.14497L2.41798 3.77528Z"
        fill="#65BAF7"
        fill-opacity="0.7"
      />
    </svg>
  ),
  leftArrow: (
    <svg
      width="220"
      height="88"
      viewBox="0 0 220 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
    >
      <path
        d="M4.58004e-05 87.5434L5.1405 84.9148L0.293915 81.7773L4.58004e-05 87.5434ZM218.57 0.244153C218.055 1.10975 217.521 1.96141 216.97 2.79941L217.805 3.34919C218.365 2.49878 218.906 1.63443 219.43 0.755847L218.57 0.244153ZM213.449 7.66824C212.206 9.24002 210.895 10.7595 209.52 12.2289L210.25 12.912C211.643 11.4231 212.972 9.88276 214.233 8.28869L213.449 7.66824ZM205.243 16.4588C203.774 17.8058 202.248 19.1069 200.668 20.3642L201.29 21.1468C202.888 19.8756 204.432 18.5593 205.919 17.1959L205.243 16.4588ZM195.834 23.9617C194.197 25.1033 192.512 26.2054 190.783 27.2701L191.307 28.1216C193.051 27.0475 194.752 25.935 196.406 24.782L195.834 23.9617ZM185.56 30.3026C183.814 31.2594 182.031 32.183 180.213 33.0755L180.653 33.9731C182.484 33.0744 184.281 32.1439 186.041 31.1796L185.56 30.3026ZM174.739 35.6256C172.907 36.4356 171.046 37.2177 169.158 37.9734L169.529 38.9018C171.428 38.1419 173.3 37.3552 175.143 36.5402L174.739 35.6256ZM163.515 40.1277C161.635 40.8123 159.733 41.4737 157.811 42.1134L158.127 43.0622C160.057 42.4197 161.968 41.7553 163.857 41.0673L163.515 40.1277ZM152.043 43.9525C150.122 44.5391 148.185 45.1063 146.234 45.6555L146.505 46.6181C148.463 46.067 150.407 45.4977 152.335 44.9088L152.043 43.9525ZM140.4 47.2353C138.453 47.7427 136.494 48.2341 134.527 48.7107L134.762 49.6826C136.735 49.2047 138.699 48.7119 140.652 48.2029L140.4 47.2353ZM128.631 50.0911C126.666 50.5359 124.694 50.9675 122.719 51.3874L122.927 52.3655C124.906 51.9448 126.882 51.5122 128.851 51.0664L128.631 50.0911ZM116.787 52.6124C114.807 53.0098 112.826 53.3968 110.846 53.7747L111.034 54.757C113.017 54.3785 115.001 53.9909 116.984 53.5928L116.787 52.6124ZM104.887 54.8865C102.895 55.2504 100.907 55.6063 98.9236 55.9558L99.0971 56.9406C101.082 56.5909 103.073 56.2345 105.067 55.8703L104.887 54.8865ZM92.9644 56.9911C90.9598 57.3349 88.9635 57.6734 86.9781 58.0081L87.1443 58.9942C89.1304 58.6594 91.1276 58.3207 93.1334 57.9767L92.9644 56.9911ZM80.9985 59.0118C78.9964 59.3471 77.0081 59.6799 75.0366 60.0117L75.2026 60.9978C77.1736 60.6661 79.1614 60.3333 81.1636 59.9981L80.9985 59.0118ZM69.0479 61.0277C67.0309 61.3734 65.0348 61.7198 63.0627 62.0687L63.2369 63.0534C65.2068 62.7049 67.2011 62.3588 69.2169 62.0134L69.0479 61.0277ZM57.1005 63.1469C55.092 63.5191 53.1132 63.896 51.1675 64.2795L51.3609 65.2606C53.3023 64.8779 55.2774 64.5018 57.2827 64.1302L57.1005 63.1469ZM45.2027 65.5014C43.1783 65.9334 41.1968 66.3757 39.2624 66.8308L39.4915 67.8042C41.4182 67.3509 43.393 66.9101 45.4114 66.4794L45.2027 65.5014ZM33.362 68.3017C31.348 68.835 29.3964 69.3872 27.5132 69.9616L27.805 70.9181C29.6749 70.3477 31.6145 69.7989 33.618 69.2684L33.362 68.3017ZM21.7369 71.8768C19.7493 72.5955 17.8592 73.3487 16.076 74.1418L16.4824 75.0555C18.2409 74.2734 20.1086 73.5289 22.0769 72.8172L21.7369 71.8768ZM10.6225 76.8929C8.76367 77.9641 7.07279 79.1034 5.56755 80.3209L6.19641 81.0984C7.6546 79.919 9.30086 78.8087 11.1218 77.7594L10.6225 76.8929Z"
        fill="#65BAF7"
        fill-opacity="0.7"
      />
    </svg>
  ),
}

export default function FeatureSection({ data, locale }: PropsWithLocale<FeatureSectionProps>) {
  if (data?.type != 'small') {
    return (
      <Container
        className={
          'text-center  pb-[60px] h-fit  mx-auto max-w-[1312px] px-4  md:!px-[80px] md:pb-0 pt-[50px] md:pt-[84px] text-[#140D31] relative'
        }
      >
        {data.title?.en && (
          <>
            <div className=" text-darkblue w-fit -tracking-[1.2px] mx-auto text-[24px] md:text-[40px] font-bold leading-[32px] md:leading-[50px]  text-center ">
              <h2>{localizedString(data.title, locale)}</h2>
              <hr className="w-1/3 m-auto mt-1 lg:mt-[9px] bg-yellow text-yellow h-[3px] rounded-full  " />
            </div>
          </>
        )}
        <div className="flex flex-col md:flex-row  md:justify-between  mt-[54px] md:mt-[74px]   gap-[60px] md:gap-6 w-full ">
          {data?.features?.map((feature, index) => (
            <Feature key={index} data={feature} locale={locale} />
          ))}
          <div className="absolute left-0 top-48 max-md:hidden w-full  flex  items-center -z-[0]">
            <svg width="100%" height="135" viewBox="0 0 856 135" fill="none">
              <path
                d="M1 94.3466C148.5 114.17 412.268 160.821 474 97.7702C514.063 56.8511 475.5 -16.993 405.5 5.00972C343 24.655 349.5 116.234 428 120.226C428 120.226 586 164.478 855 94.3466"
                stroke="#65BAF7"
                strokeOpacity="0.7"
                strokeDasharray="6 6"
              />
            </svg>
          </div>
          <div className="absolute  w-inherit  md:hidden space-y-[79px] ">
            <div className="w-full mt-14 mr-20"> {mobBgArrowSVG.leftArrow}</div>
            <div className="w-full pt-2 ml-10">{mobBgArrowSVG.rightArrow}</div>
          </div>
        </div>
      </Container>
    )
  }
  return (
    <div className={'bg-[#F2FAFF] md:px-20 text-center py-5 md:py-3 '}>
      <Container>
        {data.title?.en && (
          <div className="flex md:items-start  items-center justify-center md:justify-start flex-col text-2xl -tracking-[0.72px] font-bold w-fit mx-auto leading-[30px] md:leading-[34px]  ">
            <h2>{data.title?.en}</h2>
            <hr className="w-[85px] md:w-1/2 mt-[6px] bg-yellow text-yellow h-0.5  mb-4" />
          </div>
        )}
        <div className="flex justify-between w-full flex-wrap gap-[15px] ">
          {data?.features?.map((feature, index) => (
            <SmallFeature key={index} data={feature} locale={locale} />
          ))}
        </div>
      </Container>
    </div>
  )
}

export type FeatureProps = { data: SanityFeature }

const Feature = ({ data, locale }: PropsWithLocale<FeatureProps>) => {
  return (
    <div className="relative text-center  flex flex-row-reversse justify-between md:flex-col items-center z-[2] h-[90px] md:h-fit [&:nth-child(odd)]:flex-row-reverse md:[&:nth-child(odd)]:flex-col">
      {data.icon?.asset?._ref && <Image src={urlFor(data.icon)} width={68} height={68} alt="" />}
      <div
        className={`md:mt-9 md:mb-2.5 text-start md:text-center max-w-[231px] md:max-w-[348px]`}
      >
        <h3 className="font-bold lg:-tracking-[0.6px] text-base md:text-xl leading-normal md:leading-loose">
          {localizedString(data.title, locale)}
        </h3>

        <p className="mt-1.5 lg:mt-2.5 lg:px-3.5 opacity-60 text-xs md:text-base  text-gray leading-tight md:leading-normal">
          {localizedString(data.description, locale)}
        </p>
      </div>
    </div>
  )
}

const SmallFeature = ({ data, locale }: PropsWithLocale<FeatureProps>) => {
  return (
    <div className="text-center flex items-center  minP-w-[160px] min-h-[64px] md:min-h-[48px] flex-col md:flex-row ">
      <Image
        src={data.icon ? urlFor(data.icon) : ''}
        width={48}
        height={48}
        alt=""
        className={'h-12 w-12'}
      />
      <h3 className="text-center font-medium md:text-start text-xs md:text-base  leading-[20px] md:leading-[24px] md:ml-3">
        {localizedString(data.title, locale)}
      </h3>
    </div>
  )
}
