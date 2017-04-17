package Converter;

/**
 * Created by me497 on 02.04.2017.
 */
import org.apache.sanselan.color.*;
import org.apache.sanselan.util.Debug;

import org.apache.sanselan.color.ColorCIELCH;
import org.apache.sanselan.color.ColorCIELab;
import org.apache.sanselan.color.ColorCIELuv;
import org.apache.sanselan.color.ColorCMY;
import org.apache.sanselan.color.ColorCMYK;
import org.apache.sanselan.color.ColorHSL;
import org.apache.sanselan.color.ColorHSV;
import org.apache.sanselan.color.ColorHunterLab;
import org.apache.sanselan.color.ColorXYZ;
import org.apache.sanselan.util.Debug;

public abstract class ColorConversions {


    public static final int convertXYZtoRGB(ColorXYZ xyz) {
        return convertXYZtoRGB(xyz.X, xyz.Y, xyz.Z);
    }

    public static final int convertXYZtoRGB(double X, double Y, double Z) {
        double var_X = X / 100.0D;
        double var_Y = Y / 100.0D;
        double var_Z = Z / 100.0D;
        double var_R = var_X * 3.2406D + var_Y * -1.5372D + var_Z * -0.4986D;
        double var_G = var_X * -0.9689D + var_Y * 1.8758D + var_Z * 0.0415D;
        double var_B = var_X * 0.0557D + var_Y * -0.204D + var_Z * 1.057D;
        if(var_R > 0.0031308D) {
            var_R = 1.055D * Math.pow(var_R, 0.4166666666666667D) - 0.055D;
        } else {
            var_R = 12.92D * var_R;
        }

        if(var_G > 0.0031308D) {
            var_G = 1.055D * Math.pow(var_G, 0.4166666666666667D) - 0.055D;
        } else {
            var_G = 12.92D * var_G;
        }

        if(var_B > 0.0031308D) {
            var_B = 1.055D * Math.pow(var_B, 0.4166666666666667D) - 0.055D;
        } else {
            var_B = 12.92D * var_B;
        }

        double R = var_R * 255.0D;
        double G = var_G * 255.0D;
        double B = var_B * 255.0D;
        return convertRGBtoRGB(R, G, B);
    }
    private static final int convertRGBtoRGB(double R, double G, double B) {
        int red = (int)Math.round(R);
        int green = (int)Math.round(G);
        int blue = (int)Math.round(B);
        red = Math.min(255, Math.max(0, red));
        green = Math.min(255, Math.max(0, green));
        blue = Math.min(255, Math.max(0, blue));
        short alpha = 255;
        int rgb = alpha << 24 | red << 16 | green << 8 | blue << 0;
        return rgb;
    }
    public static final ColorXYZ convertRGBtoXYZ(int rgb) {
        int r = 255 & rgb >> 16;
        int g = 255 & rgb >> 8;
        int b = 255 & rgb >> 0;
        double var_R = (double)r / 255.0D;
        double var_G = (double)g / 255.0D;
        double var_B = (double)b / 255.0D;
        if(var_R > 0.04045D) {
            var_R = Math.pow((var_R + 0.055D) / 1.055D, 2.4D);
        } else {
            var_R /= 12.92D;
        }

        if(var_G > 0.04045D) {
            var_G = Math.pow((var_G + 0.055D) / 1.055D, 2.4D);
        } else {
            var_G /= 12.92D;
        }

        if(var_B > 0.04045D) {
            var_B = Math.pow((var_B + 0.055D) / 1.055D, 2.4D);
        } else {
            var_B /= 12.92D;
        }

        var_R *= 100.0D;
        var_G *= 100.0D;
        var_B *= 100.0D;
        double X = var_R * 0.4124D + var_G * 0.3576D + var_B * 0.1805D;
        double Y = var_R * 0.2126D + var_G * 0.7152D + var_B * 0.0722D;
        double Z = var_R * 0.0193D + var_G * 0.1192D + var_B * 0.9505D;
        return new ColorXYZ(X, Y, Z);
    }
    public static final ColorCIELab convertXYZtoCIELab(ColorXYZ xyz) {
        return convertXYZtoCIELab(xyz.X, xyz.Y, xyz.Z);
    }

    public static final ColorCIELab convertXYZtoCIELab(double X, double Y, double Z) {
        double var_X = X / 95.047D;
        double var_Y = Y / 100.0D;
        double var_Z = Z / 108.883D;
        if(var_X > 0.008856D) {
            var_X = Math.pow(var_X, 0.3333333333333333D);
        } else {
            var_X = 7.787D * var_X + 0.13793103448275862D;
        }

        if(var_Y > 0.008856D) {
            var_Y = Math.pow(var_Y, 0.3333333333333333D);
        } else {
            var_Y = 7.787D * var_Y + 0.13793103448275862D;
        }

        if(var_Z > 0.008856D) {
            var_Z = Math.pow(var_Z, 0.3333333333333333D);
        } else {
            var_Z = 7.787D * var_Z + 0.13793103448275862D;
        }

        double L = 116.0D * var_Y - 16.0D;
        double a = 500.0D * (var_X - var_Y);
        double b = 200.0D * (var_Y - var_Z);
        return new ColorCIELab(L, a, b);
    }

    public static final ColorXYZ convertCIELabtoXYZ(ColorCIELab cielab) {
        return convertCIELabtoXYZ(cielab.L, cielab.a, cielab.b);
    }

    public static final ColorXYZ convertCIELabtoXYZ(double L, double a, double b) {
        double var_Y = (L + 16.0D) / 116.0D;
        double var_X = a / 500.0D + var_Y;
        double var_Z = var_Y - b / 200.0D;
        if(Math.pow(var_Y, 3.0D) > 0.008856D) {
            var_Y = Math.pow(var_Y, 3.0D);
        } else {
            var_Y = (var_Y - 0.13793103448275862D) / 7.787D;
        }

        if(Math.pow(var_X, 3.0D) > 0.008856D) {
            var_X = Math.pow(var_X, 3.0D);
        } else {
            var_X = (var_X - 0.13793103448275862D) / 7.787D;
        }

        if(Math.pow(var_Z, 3.0D) > 0.008856D) {
            var_Z = Math.pow(var_Z, 3.0D);
        } else {
            var_Z = (var_Z - 0.13793103448275862D) / 7.787D;
        }

        double X = 95.047D * var_X;
        double Y = 100.0D * var_Y;
        double Z = 108.883D * var_Z;
        return new ColorXYZ(X, Y, Z);
    }

}
