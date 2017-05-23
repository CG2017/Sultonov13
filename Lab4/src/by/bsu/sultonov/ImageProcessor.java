package by.bsu.sultonov;

import org.apache.commons.imaging.ImageInfo;
import org.apache.commons.imaging.ImageReadException;
import org.apache.commons.imaging.Imaging;

import java.io.File;
import java.io.IOException;

public class ImageProcessor {

    public void processImages() {
        File directory = new File("images/");
        File[] files = directory.listFiles();

        System.out.println("File\t\t\t\t\t\tType");
        for(File file : files != null ? files : new File[0]) {
            ImageInfo imageInfo = null;
            try {
                imageInfo = Imaging.getImageInfo(file);
            } catch (ImageReadException | IOException e) {
                e.printStackTrace();
            }
//            System.out.println( file.getName()+"        "+ imageInfo.getFormatName()+"          "+imageInfo.getWidth()+"            "+ imageInfo.getHeight()+
//                    "       "+ imageInfo.getPhysicalHeightDpi()+"       "+ imageInfo.getPhysicalWidthDpi()+"        "+
//                    imageInfo.getCompressionAlgorithm());
            assert imageInfo != null;
            System.out.printf("%-25s\t%-45s\t%5d\t%6d\t%6d\t%-20s%n",
                    file.getName(),
                    imageInfo.getFormatName(),
                    imageInfo.getWidth(),
                    imageInfo.getHeight(),
                    imageInfo.getPhysicalWidthDpi(),
                    imageInfo.getCompressionAlgorithm());
        }
    }
}
