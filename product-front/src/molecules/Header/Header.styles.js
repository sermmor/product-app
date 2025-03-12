export const getHeaderStyle = () => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
  justifyContent: 'space-between',
  gap: '3rem',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  width: '100%',
});

export const getTitleHeaderStyle = () => ({
  paddingLeft: '2rem',
});

export const getTitleStyle = () => ({
  color: '#121417',
  fontWeight: 'bold',
  fontSize: '2rem',
  lineHeight: 'inherit',
});

export const getContentStyle = (isCentered) => {
  const added = isCentered ? {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } : {maxWidth: '105rem'};

  return {
    paddingLeft: '2rem',
    paddingRight: '2rem',
    ...added,
  };
};
