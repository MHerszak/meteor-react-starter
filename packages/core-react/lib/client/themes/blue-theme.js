'use strict';

const Colors = MUI.Libs.Colors;
const ColorManipulator = MUI.Libs.ColorManipulator;
const Spacing = MUI.Libs.Spacing;

/**
 * Check out: https://github.com/callemall/material-ui/blob/master/src/styles/theme-manager.js
 * to see more.
 * @type {{spacing: *, fontFamily: string, palette: {primary1Color: string, primary2Color: string, primary3Color: string, accent1Color: string, accent2Color: string, accent3Color: string, textColor: string, alternateTextColor: string, canvasColor: string, borderColor: string, disabledColor: *}}}
 */

let BlueTheme =
{
    spacing: Spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: Colors.blue200,
        primary2Color: Colors.blue400,
        primary3Color: Colors.lightBlack,
        accent1Color: Colors.pinkA200,
        accent2Color: Colors.grey100,
        accent3Color: Colors.grey500,
        textColor: Colors.darkBlack,
        alternateTextColor: Colors.white,
        canvasColor: Colors.white,
        borderColor: Colors.grey300,
        disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    },
};
_.extend(Base2Ind,{BlueTheme});