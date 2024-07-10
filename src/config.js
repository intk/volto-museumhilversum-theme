import '@plone/volto/config';
import CookieBanner from 'volto-cookie-banner/CookieBannerContainer';
import {
  ColumnsView,
  HomepageView,
  MultipleContentView,
  WebslidesBlocksView,
  WebslidesView,
} from './components';
import ButtonsBlockTemplate from './components/manage/Blocks/Listing/ButtonsTemplate';
import HeaderCarouselTemplate from './components/manage/Blocks/Listing/HeaderCarousel';
import ListingsBlockTemplate from './components/manage/Blocks/Listing/ListingTemplate';
import ListingsBlockFourSquaresTemplate from './components/manage/Blocks/Listing/ListingTemplateFourSquares';
import ListingsBlockSquaresTemplate from './components/manage/Blocks/Listing/ListingTemplateSquares';
import ListingsBlockTemplateTwoColumns from './components/manage/Blocks/Listing/ListingTemplateTwoColumns';
import SliderListingBlockTemplate from './components/manage/Blocks/Listing/SliderListing';
import SliderBlockTemplate from './components/manage/Blocks/Listing/SliderTemplate';
import TestimonialsListingBlockTemplate from './components/manage/Blocks/Listing/TestimonialsTemplate';

export default function applyConfig(config) {
  config.settings = {
    ...config.settings,
    devProxyToApiPath: 'http://localhost:11080/museumhilversum',
    // devProxyToApiPath: 'http://localhost:8080/Plone', // For local dev
    isMultilingual: true,
    supportedLanguages: ['en', 'nl'],
    defaultLanguage: 'en',
    navDepth: 2,
    contentMetadataTagsImageField: 'preview_image',
    appExtras: [
      ...config.settings.appExtras,
      {
        match: '*',
        component: CookieBanner,
      },
    ],
  };

  config.blocks.blocksConfig.listing.variations = [
    ...config.blocks.blocksConfig.listing.variations,
    {
      id: 'testimonials',
      isDefault: false,
      title: 'Testimonials',
      template: TestimonialsListingBlockTemplate,
    },
    {
      id: 'listings',
      isDefault: false,
      title: 'Listings',
      template: ListingsBlockTemplate,
    },
    {
      id: 'listings_two_columns',
      isDefault: false,
      title: 'Listings (Two columns)',
      template: ListingsBlockTemplateTwoColumns,
    },
    {
      id: 'listings_squares',
      isDefault: false,
      title: 'Listings (Squares)',
      template: ListingsBlockSquaresTemplate,
    },
    {
      id: 'listings_four_squares',
      isDefault: false,
      title: 'Listings (Four squares)',
      template: ListingsBlockFourSquaresTemplate,
    },
    {
      id: 'buttons',
      isDefault: false,
      title: 'Buttons',
      template: ButtonsBlockTemplate,
    },
    {
      id: 'slider',
      isDefault: false,
      title: 'Slider (ronded)',
      template: SliderBlockTemplate,
    },
    {
      id: 'slider_listing',
      isDefault: false,
      title: 'Slider (listing)',
      template: SliderListingBlockTemplate,
    },
    {
      id: 'slider_header',
      isDefault: false,
      title: 'Slider (Header)',
      template: HeaderCarouselTemplate,
    },
  ];

  config.views = {
    ...config.views,
    layoutViews: {
      ...config.views.layoutViews,
      columns_view: ColumnsView,
      multiplecontent_view: MultipleContentView,
      homepage_view: HomepageView,
      webslides_view: WebslidesView,
      webslides_blocks_view: WebslidesBlocksView,
    },
  };

  config.settings.showTags = false;

  return config;
}
