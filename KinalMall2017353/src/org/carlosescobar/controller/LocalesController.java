
package org.carlosescobar.controller;

import java.net.URL;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.ResourceBundle;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javax.swing.JOptionPane;
import org.carlosescobar.bean.Locales;
import org.carlosescobar.db.Conexion;
import org.carlosescobar.system.Principal;


public class LocalesController implements Initializable{
    private enum operaciones{NUEVO, GUARDAR, ELIMINAR, ACTUALIZAR, NINGUNO };
    private operaciones tipoDeOperaciones = operaciones.NINGUNO;
    private Principal escenarioPrincipal;
    private ObservableList<Locales> listaLocales;
    @FXML private Button btnNuevo;
    @FXML private Button btnEliminar;
    @FXML private Button btnEditar;
    @FXML private Button btnReporte;
    @FXML private TextField txtCodigoLocal;
    @FXML private TextField txtSaldoFavor;
    @FXML private TextField txtSaldoContra;
    @FXML private TextField txtMesesPendientes;
    @FXML private TextField txtDisponibilidad;
    @FXML private TextField txtValorLocal;
    @FXML private TextField txtValorAdministracion;
    @FXML private TableView tblLocales;
    @FXML private TableColumn colSaldoFavor;
    @FXML private TableColumn colSaldoContra;
    @FXML private TableColumn colMesesPendientes;
    @FXML private TableColumn colDisponibilidad;
    @FXML private TableColumn colValorLocal;
    @FXML private TableColumn colAdministracion;
    @FXML private TableColumn colCodigoLocal;
    @FXML private ImageView imgNuevo;
    @FXML private ImageView imgEliminar;
    @FXML private ImageView imgEditar;
    @FXML private ImageView imgReporte;
    @Override
    public void initialize(URL location, ResourceBundle resources) {
        
       cargarDatos();   
    }
    public void cargarDatos(){
        tblLocales.setItems(getLocales());
        colCodigoLocal.setCellValueFactory(new PropertyValueFactory<Locales,Integer>("codigoLocal"));
        colSaldoFavor.setCellValueFactory(new PropertyValueFactory<Locales,Double>("saldoFavor"));
        colSaldoContra.setCellValueFactory(new PropertyValueFactory<Locales,Double>("saldoContra"));
        colMesesPendientes.setCellValueFactory(new PropertyValueFactory<Locales,Integer>("mesesPendientes"));
        colDisponibilidad.setCellValueFactory(new PropertyValueFactory<Locales,Boolean>("disponibilidad"));
        colValorLocal.setCellValueFactory(new PropertyValueFactory<Locales,Double>("valorLocal"));
        colAdministracion.setCellValueFactory(new PropertyValueFactory<Locales,Double>("valorAdministracion"));
    }
    public ObservableList<Locales> getLocales(){
        ArrayList<Locales> lista = new ArrayList<Locales>();
        try{
        PreparedStatement procedimiento = Conexion.getInstance() .getConexion() .prepareCall("{call sp_ListarLocales()}");
              ResultSet resultado = procedimiento.executeQuery();
              
        while(resultado.next()){
            lista.add(new Locales(resultado.getInt("codigoLocal"),
                                                resultado.getDouble("saldoFavor"),
                                                resultado.getDouble("saldoContra"),
                                                resultado.getInt("mesesPendientes"),
                                                resultado.getBoolean("disponibilidad"),
                                                resultado.getDouble("valorLocal"),
                                                resultado.getDouble("valorAdministracion")));
        }      
        
        
        }catch(Exception e){
            e.printStackTrace();
        }
        return listaLocales = FXCollections.observableList(lista);
        
    
    }
    public void seleccionarElemento(){
        if(tblLocales.getSelectionModel().getSelectedItem() != null){
                txtCodigoLocal.setText(String.valueOf(((Locales)tblLocales.getSelectionModel().getSelectedItem()).getCodigoLocal()));
                txtSaldoFavor.setText(String.valueOf(((Locales)tblLocales.getSelectionModel().getSelectedItem()).getSaldoFavor()));
                txtSaldoContra.setText(String.valueOf(((Locales)tblLocales.getSelectionModel().getSelectedItem()).getSaldoContra()));
                txtMesesPendientes.setText(String.valueOf(((Locales)tblLocales.getSelectionModel().getSelectedItem()).getMesesPendientes()));
                txtDisponibilidad.setText(String.valueOf(((Locales)tblLocales.getSelectionModel().getSelectedItem()).getDisponibilidad()));
                txtValorLocal.setText(String.valueOf(((Locales)tblLocales.getSelectionModel().getSelectedItem()).getValorLocal()));
                txtValorAdministracion.setText(String.valueOf(((Locales)tblLocales.getSelectionModel().getSelectedItem()).getValorAdministracion()));
        }
    }
          public void nuevo(){
          switch(tipoDeOperaciones){
              case NINGUNO:
                  activarControles();
                  btnNuevo.setText("Guardar");
                  btnEliminar.setText("Cancelar");
                  btnEditar.setDisable(true);
                  btnReporte.setDisable(true);
                  imgNuevo.setImage(new Image("/org/carlosescobar/images/guardar.png"));
                  imgEliminar.setImage(new Image("/org/carlosescobar/images/cancelar.png"));
                  tipoDeOperaciones = operaciones.GUARDAR;
                  break;
              case GUARDAR:
                  guardar();
                  desactivarControles();
                  limpiarControles();
                  btnNuevo.setText("Nuevo");
                  btnEliminar.setText("Eliminar");
                  btnEditar.setDisable(false);
                  btnReporte.setDisable(false);
                  imgNuevo.setImage(new Image("/org/carlosescobar/images/nuevo boton 1 xd.png"));
                  imgEliminar.setImage(new Image("/org/carlosescobar/images/elimi.png"));
                  tipoDeOperaciones = operaciones.NINGUNO;
                  cargarDatos();
                  break;
          }

      }
     public void guardar(){
            Locales registro = new Locales();
            registro.setSaldoFavor(Double.valueOf(txtSaldoFavor.getText()));
            registro.setSaldoContra(Double.valueOf(txtSaldoContra.getText()));
            registro.setMesesPendientes(Integer.valueOf(txtMesesPendientes.getText()));
            registro.setDisponibilidad(Boolean.valueOf(txtDisponibilidad.getText()));
            registro.setValorLocal(Double.valueOf(txtValorLocal.getText()));
            registro.setValorAdministracion(Double.valueOf(txtValorAdministracion.getText()));
        try {
            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("{call sp_AgregarLocales(?,?,?,?,?,?)}");
            procedimiento.setDouble(1, registro.getSaldoFavor());
            procedimiento.setDouble(2, registro.getSaldoContra());
            procedimiento.setInt(3, registro.getMesesPendientes());
            procedimiento.setBoolean(4, registro.getDisponibilidad());
            procedimiento.setDouble(5, registro.getValorLocal());
            procedimiento.setDouble(6, registro.getValorAdministracion());
            procedimiento.execute();
            listaLocales.add(registro);
        } catch (Exception e) {
            e.printStackTrace();
        }


    }
    public void eliminar(){
        switch(tipoDeOperaciones){
            case GUARDAR:
                  desactivarControles();
                  limpiarControles();
                  btnNuevo.setText("Nuevo");
                  btnEliminar.setText("Eliminar");
                  imgNuevo.setImage(new Image("/org/carlosescobar/images/nuevo boton 1 xd.png"));
                  imgEliminar.setImage(new Image("/org/carlosescobar/images/elimi.png"));
                  btnEditar.setDisable(false);
                  btnReporte.setDisable(false);
                  tipoDeOperaciones = operaciones.NINGUNO;
                  break;
            default:
                if(tblLocales.getSelectionModel().getSelectedItem() != null){
                    int respuesta = JOptionPane.showConfirmDialog(null, "¿Estas seguro de Eliminar?","Eliminado",JOptionPane.YES_NO_OPTION, JOptionPane.QUESTION_MESSAGE);
                    if(respuesta == JOptionPane.YES_OPTION){
                        try{
                            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("{call sp_EliminarLocales(?)}");
                            procedimiento.setInt(1, ((Locales)tblLocales.getSelectionModel().getSelectedItem()).getCodigoLocal());
                            procedimiento.execute();
                            listaLocales.remove(tblLocales.getSelectionModel().getSelectedIndex());
                            limpiarControles();
                        }catch(Exception e){
                            e.printStackTrace();
                        }
                    }
                    
                
                }else{
                JOptionPane.showConfirmDialog(null, "Debe Seleccionar un elemento");
                
            }
        
        }
    
    }
    public void editar(){
        switch(tipoDeOperaciones){
            case NINGUNO:
                if(tblLocales.getSelectionModel().getSelectedItem() != null){
                      btnEditar.setText("Actualizar");
                      btnReporte.setText("Cancelar");
                      imgEditar.setImage(new Image("/org/carlosescobar/images/actualizar.png"));
                      imgReporte.setImage(new Image("/org/carlosescobar/images/cancelar.png"));
                      btnNuevo.setDisable(true);
                      btnEliminar.setDisable(true);
                      activarControles();
                      tipoDeOperaciones = operaciones.ACTUALIZAR;
                }else{
                    JOptionPane.showMessageDialog(null, "Debe seleccionar un elemento.");
                }
                break;
            case ACTUALIZAR:
                  actualizar();
                  btnEditar.setText("Editar");
                  btnReporte.setText("Reporte");
                  imgEditar.setImage(new Image("/org/carlosescobar/images/edit.png"));
                  imgReporte.setImage(new Image("/org/carlosescobar/images/report.png"));
                  btnNuevo.setDisable(false);
                  btnEliminar.setDisable(false);
                  desactivarControles();
                  limpiarControles();
                  tipoDeOperaciones = operaciones.NINGUNO;
                  cargarDatos();
                  break;
        }
    }
    
    public void actualizar(){
        try{
            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("{call sp_EditarLocales(?,?,?,?,?,?,?)}");
            Locales registro = (Locales)tblLocales.getSelectionModel().getSelectedItem();
            registro.setSaldoFavor(Double.valueOf(txtSaldoFavor.getText()));
            registro.setSaldoContra(Double.valueOf(txtSaldoContra.getText()));
            registro.setMesesPendientes(Integer.valueOf(txtMesesPendientes.getText()));
            registro.setDisponibilidad(Boolean.valueOf(txtDisponibilidad.getText()));
            registro.setValorLocal(Double.valueOf(txtValorLocal.getText()));
            registro.setValorAdministracion(Double.valueOf(txtValorAdministracion.getText()));
            procedimiento.setInt(1, registro.getCodigoLocal());
            procedimiento.setDouble(2, registro.getSaldoFavor());
            procedimiento.setDouble(3, registro.getSaldoContra());
            procedimiento.setInt(4, registro.getMesesPendientes());
            procedimiento.setBoolean(5, registro.getDisponibilidad());
            procedimiento.setDouble(6, registro.getValorLocal());
            procedimiento.setDouble(7, registro.getValorAdministracion());
            procedimiento.execute();
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    public void reporte(){
        switch(tipoDeOperaciones){
            case ACTUALIZAR:
                 desactivarControles();
                  limpiarControles();
                  btnEditar.setText("Editar");
                  btnReporte.setText("Reporte");
                  imgEditar.setImage(new Image("/org/carlosescobar/images/edit.png"));
                  imgReporte.setImage(new Image("/org/carlosescobar/images/report.png"));
                  btnNuevo.setDisable(false);
                  btnEliminar.setDisable(false);
                  tipoDeOperaciones = operaciones.NINGUNO;
                  break;
        
        }
    }
          
          
    public void activarControles(){
        txtCodigoLocal.setEditable(false);
        txtSaldoFavor.setEditable(true);
        txtSaldoContra.setEditable(true);
        txtMesesPendientes.setEditable(true);
        txtDisponibilidad.setEditable(true);
        txtValorLocal.setEditable(true);
        txtValorAdministracion.setEditable(true);
        
    }
    public void desactivarControles(){
        txtCodigoLocal.setEditable(false);
        txtSaldoFavor.setEditable(false);
        txtSaldoContra.setEditable(false);
        txtMesesPendientes.setEditable(false);
        txtDisponibilidad.setEditable(false);
        txtValorLocal.setEditable(false);
        txtValorAdministracion.setEditable(false);
    }
    public void limpiarControles(){
        txtCodigoLocal.clear();
        txtSaldoFavor.clear();
        txtSaldoContra.clear();
        txtMesesPendientes.clear();
        txtDisponibilidad.clear();
        txtValorLocal.clear();
        txtValorAdministracion.clear();
    
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
