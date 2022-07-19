/*
    Programador: Carlos Escobar
    carnet: 2017353
    IN5AM
    Fecha de creación: 14/04/2021
    Fechas de modificación:
                botónes del 0 a 9  14/04/2021
                TextField Pantalla
                botón Suma
                botón Resta
                botón Multiplicación
                botón División
                botón MasMenos   18/04/2021
                botón Igual
                botón Punto
                botón Raiz
                botón abs
                botón Porcentaje    21/04/2021
                botón x elevado y
                botón C
                botón CE
                image icono de la calculadora 22/04/2021
 */
package org.carlosescobar.system;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;
import javafx.scene.image.Image;


public class Principal extends Application {
    
    @Override
    public void start(Stage escenarioPrincipal) throws Exception {
        Parent root = FXMLLoader.load(getClass().getResource("FXMLDocument.fxml"));
        Scene scene = new Scene(root);
        escenarioPrincipal.setScene(scene);
        escenarioPrincipal.setTitle("Calculadora Científica Carlos Escobar");
        escenarioPrincipal.getIcons().add(new Image("/org/carlosescobar/image/1519882675469.png"));
        escenarioPrincipal.show();
    }

    
    public static void main(String[] args) {
        launch(args);
    }
    
}
