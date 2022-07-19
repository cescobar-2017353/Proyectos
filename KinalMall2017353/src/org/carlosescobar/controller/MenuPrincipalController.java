package org.carlosescobar.controller;

import java.net.URL;
import java.util.ResourceBundle;
import javafx.fxml.Initializable;
import org.carlosescobar.system.Principal;


public class MenuPrincipalController implements Initializable {
    private Principal escenarioPrincipal;
    
    @Override
    public void initialize(URL location, ResourceBundle resources) {
        
    }

    public Principal getEscenarioPrincipal() {
        return escenarioPrincipal;
    }

    public void setEscenarioPrincipal(Principal escenarioPrincipal) {
        this.escenarioPrincipal = escenarioPrincipal;
    }
    
    public void ventanaProgramador(){
        escenarioPrincipal.ventanaProgramador();
    }
    
    public void ventanaAdministracion(){
        escenarioPrincipal.ventanaAdministracion();
    }
    public void ventanaLocales(){
        escenarioPrincipal.ventanaLocales();
    }
    public void ventanaTipoCliente(){
        escenarioPrincipal.ventanaTipoCliente();
    }
    public void ventanaDepartamentos(){
        escenarioPrincipal.ventanaDepartamentos();
    }
    public void ventanaProveedores(){
        escenarioPrincipal.ventanaProveedores();
    }
    public void ventanaCuentasPorPagar(){
        escenarioPrincipal.ventanaCuentasPorPagar();
    }
    public void ventanaHorarios(){
        escenarioPrincipal.ventanaHorarios();
    }
    public void ventanaLogin(){
        escenarioPrincipal.ventanaLogin();
    }
}
