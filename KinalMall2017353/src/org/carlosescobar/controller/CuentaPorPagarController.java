
package org.carlosescobar.controller;

import eu.schudt.javafx.controls.calendar.DatePicker;
import java.net.URL;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Locale;
import java.util.ResourceBundle;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;
import javafx.scene.image.ImageView;
import javafx.scene.layout.GridPane;
import org.carlosescobar.bean.Administracion;
import org.carlosescobar.bean.CuentaPorPagar;
import org.carlosescobar.bean.Proveedores;
import org.carlosescobar.db.Conexion;
import org.carlosescobar.system.Principal;


public class CuentaPorPagarController implements Initializable{
    private enum operaciones{NUEVO, GUARDAR, ACTUALIZAR, NINGUNO}
    private operaciones tipoDeOperacion = operaciones.NINGUNO;
    private Principal escenarioPrincipal;
    private ObservableList<CuentaPorPagar> listaCuentaPorPagar;
    private ObservableList<Administracion> listaAdministracion;
    private ObservableList<Proveedores> listaProveedores;
    private DatePicker fechaLimite;
    @FXML private Button btnNuevo;
    @FXML private Button btnEliminar;
    @FXML private Button btnEditar;
    @FXML private Button btnReporte;
    @FXML private TextField txtCuentaPorPagar;
    @FXML private TextField txtNumeroFactura;
    @FXML private TextField txtEstadoPago;
    @FXML private TextField txtValorNetoPago;
    @FXML private ComboBox cmbCodigoAdminitracion;
    @FXML private ComboBox cmbCodigoProveedor;
    @FXML private GridPane grpFechaLimite;
    @FXML private TableView tblCuentasPorPagar;
    @FXML private TableColumn colCuentaPorPagar;
    @FXML private TableColumn colNumeroFactura;
    @FXML private TableColumn colFechaLimitePago;
    @FXML private TableColumn colEstadoPago;
    @FXML private TableColumn colValorNetoPago;
    @FXML private TableColumn colCodigoAdministracion;
    @FXML private TableColumn colCodigoProveedor;
    @FXML private ImageView imgNuevo;
    @FXML private ImageView imgEliminar;
    @FXML private ImageView imgEditar;
    @FXML private ImageView imgReporte;
    
    
    
    @Override
    public void initialize(URL location, ResourceBundle resources) {
        fechaLimite = new DatePicker(Locale.ENGLISH);
        fechaLimite.setDateFormat(new SimpleDateFormat("yyyy-MM-dd"));
        fechaLimite.getCalendarView().todayButtonTextProperty().set("Today");
        fechaLimite.getCalendarView().setShowWeeks(false);
        grpFechaLimite.add(fechaLimite, 5, 0);
        fechaLimite.getStylesheets().add("/org/carlosescobar/resource/DatePicker.css");
//        cargarDatos();
    }
//    public void cargarDatos(){
//        tblCuentasPorPagar.setItems(getCuentaPorPagar());
//        colCuentaPorPagar.setCellValueFactory(new PropertyValueFactory<CuentaPorPagar, Integer>("codigoCuentasPorPagar"));
//        
//    }
    public ObservableList<CuentaPorPagar> getCuentaPorPagar(){
        ArrayList<CuentaPorPagar> lista = new ArrayList<CuentaPorPagar>();
        try{
            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("{call sp_ListarCuentasPorPagar()}");
            ResultSet resultado = procedimiento.executeQuery();
            while(resultado.next()){
                lista.add(new CuentaPorPagar(resultado.getInt("codigoCuentasPorPagar"),
                                                            resultado.getString("numeroFactura"),
                                                            resultado.getDate("fechaLimitePago"),
                                                            resultado.getString("estadoPago"),
                                                            resultado.getDouble("valorNetoPago"),
                                                            resultado.getInt("codigoAdministracion"),
                                                            resultado.getInt("codigoProveedor")));
            
            }
            
        }catch(Exception e){
            e.printStackTrace();
        
        }
        
        
        
        
        return listaCuentaPorPagar = FXCollections.observableList(lista);
    
    }

    public Principal getEscenarioPrincipal() {
        return escenarioPrincipal;
    }

    public void setEscenarioPrincipal(Principal escenarioPrincipal) {
        this.escenarioPrincipal = escenarioPrincipal;
    }
    public void menuPrincipal(){
        escenarioPrincipal.menuPrincipal();
    }
    
}
