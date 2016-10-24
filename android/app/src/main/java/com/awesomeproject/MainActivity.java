package com.awesomeproject;

import com.facebook.react.ReactActivity;
import com.rnfs.RNFSPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;
//import com.keyee.pdfview.PDFView;
//import com.parkerdan.htmltopdf.RNHTMLtoPDFPackage;

//import io.realm.react.RealmReactPackage;

//import org.pgsqlite.SQLitePluginPackage;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "AwesomeProject";
    }

//                new PDFView(), // <------ add here
//                new SQLitePluginPackage(),
//                new RealmReactPackage()
//    @Override
//    protected List<ReactPackage> getPackages() {
//        return Arrays.<ReactPackage>asList(
//                new MainReactPackage(),
//                new RNFSPackage()
//        );
//    }
}
