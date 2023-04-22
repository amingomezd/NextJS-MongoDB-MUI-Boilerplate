import PageLayoutView from './PageLayoutView';

const PageLayout = ({ children, noPadding, title, subtitle }) => {
  return (
    <PageLayoutView noPadding={noPadding} title={title} subtitle={subtitle}>
      {children}
    </PageLayoutView>
  );
};

export default PageLayout;
