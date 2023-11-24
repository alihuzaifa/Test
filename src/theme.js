export const tokensDark = {
  grey: {},
  primary: {
    100: "#d3d4de",
  },
  secondary: {
    50: "#f0f0f0",
  },
};
// function that reverses the color palette
function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[100],
              light: tokensDark.primary[100],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[50],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.secondary[50],
            },
            background: {
              default: tokensDark.primary[600],
              alt: tokensDark.primary[500],
            },
          }
        : {
            primary: {
              ...tokensLight.primary,
              main: tokensDark.secondary[50],
              light: tokensDark.secondary[50],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensDark.secondary[50],
              light: tokensDark.secondary[50],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensDark.secondary[50],
            },
            background: {
              default: tokensDark.secondary[50],
              alt: tokensDark.secondary[50],
            },
          }),
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
