package com.awesomeproject;

import com.facebook.react.ReactActivity;
import com.keyee.pdfview.PDFView;
import com.parkerdan.htmltopdf.RNHTMLtoPDFPackage;

import io.realm.react.RealmReactPackage;

import org.pgsqlite.SQLitePluginPackage;

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
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new SQLitePluginPackage(),
                new MainReactPackage(),
                new RealmReactPackage()
        );
    }
}
