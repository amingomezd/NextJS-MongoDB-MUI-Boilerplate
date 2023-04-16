export const styles = ({ isDesktop }) => {
  return {
    appBar: {
      backgroundColor: 'white',
      py: !isDesktop && 1
    },
    toolbar: {
      direction: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    desktopNavigationBox: {},
    mobileNavigationBox: {
      color: '#1976d2'
    },
    optionsMenuBox: {
      display: 'flex',
      justifyContent: 'end'
    },
    desktopNavigationLink: {
      my: 2,
      marginLeft: '10px'
    },
    mobileNavigationMenu: {
      display: 'block'
    }
  };
};
