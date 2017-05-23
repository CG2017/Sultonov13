package test;

import algorithms.BresenhamAlgorithm;
import algorithms.BresenhamCircleAlgorithm;
import algorithms.CDAAlgorithm;
import algorithms.SimpleStepAlgorithm;
import org.jfree.ui.FontDisplayField;
import org.jfree.ui.RefineryUtilities;
import org.jfree.ui.tabbedui.VerticalLayout;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Main {
    private static TYPE curr = TYPE.BRES;

    private enum TYPE {
        BRES("Bresenham"),
        BRES_CIRCLE("Circle"),
        CDA("CDA"),
        SIMPLE("Simple");

        private String val;

        public String getVal() {
            return val;
        }

        public void setVal(String val) {
            this.val = val;
        }

        TYPE(String val) {
            this.val = val;
        }
    }

    static JTextField x0tf;
    static JTextField y0tf;
    static JTextField x1tf;
    static JTextField y1tf;
    static JTextField Rtf;

    static JLabel labl = new JLabel(TYPE.BRES.getVal());

    public static void main(String[] args) {
        // write your code here
        x0tf = new JTextField();
        y0tf = new JTextField();
        x1tf = new JTextField();
        y1tf = new JTextField();
        Rtf = new JTextField();

        final JFrame mainFrame = new JFrame();
        mainFrame.setVisible(true);
        mainFrame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        mainFrame.setPreferredSize(new Dimension(500, 500));
        JMenuBar menuBar = new JMenuBar();

        JMenu jMenuType = new JMenu("Types");
        JMenuItem jMenuItemBres = new JMenuItem("Bresenham");
        JMenuItem jMenuItemCircle = new JMenuItem("Bresenham circle");
        JMenuItem jMenuItemCDA = new JMenuItem("CDA");
        JMenuItem jMenuItemSimple = new JMenuItem("Simple");

        jMenuItemBres.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                curr = TYPE.BRES;
                labl.setText(TYPE.BRES.getVal());
                mainFrame.getContentPane().remove(0);
                mainFrame.getContentPane().add(getPanel());
                mainFrame.repaint();
                mainFrame.pack();
            }
        });

        jMenuItemCDA.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                curr = TYPE.CDA;
                labl.setText(TYPE.CDA.getVal());
                mainFrame.getContentPane().remove(0);
                mainFrame.getContentPane().add(getPanel());
                mainFrame.repaint();
                mainFrame.pack();
            }
        });

        jMenuItemSimple.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                curr = TYPE.SIMPLE;
                labl.setText(TYPE.SIMPLE.getVal());
                mainFrame.getContentPane().remove(0);
                mainFrame.getContentPane().add(getPanel());
                mainFrame.repaint();
                mainFrame.pack();
            }
        });

        jMenuItemCircle.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                curr = TYPE.BRES_CIRCLE;
                //mainFrame.remove(0);
                labl.setText(TYPE.BRES_CIRCLE.getVal());
                JPanel notCircle = new JPanel();
                notCircle.setLayout(new VerticalLayout());

                String text = x0tf.getText();
                JLabel x0 = new JLabel("x0");
                x0tf = new JTextField(text);
                JLabel y0 = new JLabel("y0");

                text = y0tf.getText();
                y0tf = new JTextField(text);
                JLabel x1 = new JLabel("R");
                Rtf = new JTextField();


                notCircle.add(x0);
                notCircle.add(x0tf);
                notCircle.add(y0);
                notCircle.add(y0tf);
                notCircle.add(x1);
                notCircle.add(Rtf);
                notCircle.add(labl);
                mainFrame.getContentPane().remove(0);
                mainFrame.getContentPane().add(notCircle);
                mainFrame.repaint();
                mainFrame.pack();

            }
        });


        jMenuType.add(jMenuItemBres);
        jMenuType.add(jMenuItemCircle);
        jMenuType.add(jMenuItemCDA);
        jMenuType.add(jMenuItemSimple);

        menuBar.add(jMenuType);

        JMenu jDraw = new JMenu("Draw");
        JMenuItem draw = new JMenuItem("Draw");

        draw.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    switch (curr) {
                        case BRES:
                            BresenhamAlgorithm demo2 = new BresenhamAlgorithm("Bresenham algorithm",
                                    Integer.parseInt(x0tf.getText()),
                                    Integer.parseInt(y0tf.getText()),
                                    Integer.parseInt(x1tf.getText()),
                                    Integer.parseInt(y1tf.getText()));

                            demo2.pack();
                            demo2.setVisible(true);
                            break;
                        case BRES_CIRCLE:
                            BresenhamCircleAlgorithm demo = new BresenhamCircleAlgorithm("Bresenham sirce algorithm",

                                    Integer.parseInt(x0tf.getText()),
                                    Integer.parseInt(y0tf.getText()),
                                    Integer.parseInt(Rtf.getText()));
                            demo.pack();
                            demo.setVisible(true);
                            break;
                        case CDA:
                            CDAAlgorithm demo3 = new CDAAlgorithm("CDA algorithm",
                                    Integer.parseInt(x0tf.getText()),
                                    Integer.parseInt(y0tf.getText()),
                                    Integer.parseInt(x1tf.getText()),
                                    Integer.parseInt(y1tf.getText()));
                            demo3.pack();
                            demo3.setVisible(true);
                            break;
                        case SIMPLE:
                            SimpleStepAlgorithm demo4 = new SimpleStepAlgorithm("CDA algorithm",
                                    Integer.parseInt(x0tf.getText()),
                                    Integer.parseInt(y0tf.getText()),
                                    Integer.parseInt(x1tf.getText()),
                                    Integer.parseInt(y1tf.getText()));
                            demo4.pack();
                            demo4.setVisible(true);
                            break;
                    }
                } catch (NumberFormatException exp) {
                    JOptionPane.showMessageDialog(mainFrame, "Fill all coordinates.");
                }
            }
        });
        jDraw.add(draw);
        menuBar.add(jDraw);

        mainFrame.setJMenuBar(menuBar);


        mainFrame.getContentPane().add(getPanel(), 0);


        mainFrame.pack();


//        SimpleStepAlgorithm demo1 = new SimpleStepAlgorithm("Simple step algorithm", 0, 0, 5, 7);
//        BresenhamAlgorithm demo2 = new BresenhamAlgorithm("Bresenham algorithm", 0, 0, 5, 7);
//        CDAAlgorithm demo3 = new CDAAlgorithm("CDA algorithm", 0, 0, 5, 7);
//        BresenhamCircleAlgorithm demo = new BresenhamCircleAlgorithm("Bresenham circle algorithm", 0, 0, 10);
//        demo.pack();
//        demo1.pack();
//        demo2.pack();
//        demo3.pack();
//        RefineryUtilities.centerFrameOnScreen(demo);
//        RefineryUtilities.centerFrameOnScreen(demo1);
//        RefineryUtilities.centerFrameOnScreen(demo2);
//        RefineryUtilities.centerFrameOnScreen(demo3);
//        demo.setVisible(true);
//        demo1.setVisible(true);
//        demo2.setVisible(true);
//        demo3.setVisible(true);
    }

    private static JPanel getPanel() {
        JPanel notCircle = new JPanel();
        notCircle.setLayout(new VerticalLayout());

        JLabel x0 = new JLabel("x0");
        String text = x0tf.getText();
        x0tf = new JTextField(text);
        JLabel y0 = new JLabel("y0");
        text = y0tf.getText();
        y0tf = new JTextField(text);
        JLabel x1 = new JLabel("x1");
        text = x1tf.getText();
        x1tf = new JTextField(text);
        JLabel y1 = new JLabel("y1");
        text = y1tf.getText();
        y1tf = new JTextField(text);

        notCircle.add(x0);
        notCircle.add(x0tf);
        notCircle.add(y0);
        notCircle.add(y0tf);
        notCircle.add(x1);
        notCircle.add(x1tf);
        notCircle.add(y1);
        notCircle.add(y1tf);
        notCircle.add(labl);
        return notCircle;
    }
}
