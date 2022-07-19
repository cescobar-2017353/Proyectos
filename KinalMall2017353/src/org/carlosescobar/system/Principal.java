/*
Programador: Carlos Escobar
 */
package org.carlosescobar.system;

import java.io.IOException;
import java.io.InputStream;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.fxml.JavaFXBuilderFactory;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.scene.layout.AnchorPane;
import javafx.stage.Stage;
import org.carlosescobar.controller.AdministracionController;
import org.carlosescobar.controller.CuentaPorPagarController;
import org.carlosescobar.controller.DepartamentosController;
import org.carlosescobar.controller.HorariosController;
import org.carlosescobar.controller.LocalesController;
import org.carlosescobar.controller.LoginController;
import org.carlosescobar.controller.MenuPrincipalController;
import org.carlosescobar.controller.ProgramadorController;
import org.carlosescobar.controller.ProveedoresController;
import org.carlosescobar.controller.TipoClienteController;
import org.carlosescobar.controller.UsuarioController;



public class Principal extends Application {
    private final String PAQUETE_VISTA = "/org/carlosescobar/view/"; // Ruta de las vistas
    private Stage escenarioPrincipal;
    private Scene escena;
    @Override
    public void start(Stage escenarioPrincipal) throws IOException {
        this.escenarioPrincipal = escenarioPrincipal;
        this.escenarioPrincipal.setTitle("KinalMall 2021");
//        Parent root = FXMLLoader.load(getClass().getResource("/org/carlosescobar/view/MenuPrincipalView.fxml"));
        escenarioPrincipal.getIcons().add(new Image("org/carlosescobar/images/logo.jpg"));
//        Scene escena = new Scene(root);
//        escenarioPrincipal.setScene(escena);
        ventanaLogin();
        escenarioPrincipal.show();
    }
    
    
    public void menuPrincipal(){
        try{
            MenuPrincipalController menu = (MenuPrincipalController)cambiarEscena("MenuPrincipalView.fxml",682,366);
            menu.setEscenarioPrincipal(this);
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    
    public void ventanaProgramador(){
        try{
            ProgramadorController programador = (ProgramadorController)cambiarEscena("ProgramadorView.fxml",687,381);
            programador.setEscenarioPrincipal(this);
        }catch(Exception e){
            e.printStackTrace();
        
    }
}  
    public void ventanaAdministracion(){
        try{
            AdministracionController admin =(AdministracionController)cambiarEscena("AdministracionView.fxml",920,517);
            admin.setEscenarioPrincipal(this);
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    public void ventanaTipoCliente(){
        try{
            TipoClienteController tipoCliente =(TipoClienteController)cambiarEscena("TipoClienteView.fxml",927,520);
            tipoCliente.setEscenarioPrincipal(this);
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    public void ventanaLocales(){
        try{
            LocalesController locales = (LocalesController)cambiarEscena("LocalesView.fxml", 1089,613);
            locales.setEscenarioPrincipal(this);
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    public void ventanaDepartamentos(){
        try{
            DepartamentosController departamentos = (DepartamentosController)cambiarEscena("DepartamentosView.fxml",935,526);
            departamentos.setEscenarioPrincipal(this);
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    public void ventanaProveedores(){
        try{
            ProveedoresController proveedores = (ProveedoresController)cambiarEscena("ProveedorView.fxml",1224,685);
            proveedores.setEscenarioPrincipal(this);
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    
    public void ventanaCuentasPorPagar(){
        try{
            CuentaPorPagarController cuentas = (CuentaPorPagarController) cambiarEscena("CuentaPorPagarView.fxml",1224,685);
            cuentas.setEscenarioPrincipal(this);
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    public void ventanaHorarios(){
        try{
            HorariosController horarios = (HorariosController) cambiarEscena("HorariosView.fxml",1224,685);
            horarios.setEscenarioPrincipal(this);
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    public void ventanaUsuario(){
        try{
            UsuarioController usuarioController = (UsuarioController)cambiarEscena("UsuarioView.fxml",962,541);
            usuarioController.setEscenarioPrincipal(this);
        }catch(Exception e){
            e.printStackTrace();
        }
    
    }
    
    public void ventanaLogin(){
        try{
            LoginController loginController = (LoginController)cambiarEscena("LoginView.fxml",962,541);
            loginController.setEscenarioPrincipal(this);
            
        }catch(Exception e){
            e.printStackTrace();
        }
    }
        
    
    
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        launch(args);
    }
    
    public Initializable cambiarEscena(String fxml,int ancho, int alto) throws IOException{
        Initializable resultado = null;
        FXMLLoader cargadorFXML = new FXMLLoader();
        InputStream archivo = Principal.class.getResourceAsStream(PAQUETE_VISTA+fxml); // "/org/carlosescobar/MenuPrincipalView.fxml""
        cargadorFXML.setBuilderFactory(new JavaFXBuilderFactory());
        cargadorFXML.setLocation(Principal.class.getResource(PAQUETE_VISTA+fxml));
        escena = new Scene((AnchorPane)cargadorFXML.load(archivo),ancho,alto);
        escenarioPrincipal.setScene(escena);
        resultado = (Initializable)cargadorFXML.getController();
        return resultado;
    }
    
}
