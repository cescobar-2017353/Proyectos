package org.pedroarmas.controller;

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
import javafx.scene.image.ImageView;
import org.pedroarmas.bean.Categoria;
import org.pedroarmas.db.Conexion;
import org.pedroarmas.system.Principal;


public class CategoriaController implements Initializable{
    private Principal escenarioPrincipal;
    private enum operaciones {NUEVO, GUARDAR, ELIMINAR, EDITAR, ACTUALIZAR,CANCELAR, NINGUNO};
    private operaciones tipoDeOperacion = operaciones.NINGUNO;
    private ObservableList<Categoria> listaCategoria;    
    @FXML private Button btnNuevo;
    @FXML private Button btnEliminar;
    @FXML private Button btnEditar;
    @FXML private Button btnReporte;
    @FXML private TextField txtCodigoCategoria;
    @FXML private TextField txtNombreCategoria;
    @FXML private TextField txtDescripcionCategoria;
    @FXML private TableView tblCategorias;
    @FXML private TableColumn colCodigoCategoria;
    @FXML private TableColumn colNombreCategoria;
    @FXML private TableColumn colDescripcionCategoria;
    @FXML private ImageView imgNuevo;
    @FXML private ImageView imgEliminar;
    @FXML private ImageView imgEditar;
    @FXML private ImageView imgReporte;
    @Override
    public void initialize(URL location, ResourceBundle resources) {
        cargarDatos();
        
    }
    
    public void cargarDatos(){
        tblCategorias.setItems(getCategoria());
        colCodigoCategoria.setCellValueFactory(new PropertyValueFactory<Categoria, Integer>("codigoCategoria"));
        colNombreCategoria.setCellValueFactory(new PropertyValueFactory<Categoria, String>("nombreCategoria"));
        colDescripcionCategoria.setCellValueFactory(new PropertyValueFactory<Categoria, String>("descripcionCategoria"));
    }
    
    public ObservableList<Categoria> getCategoria(){
        ArrayList<Categoria> lista = new ArrayList<Categoria>();
        try{
            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("{call sp_ListarCategorias()}");
            ResultSet resultado = procedimiento.executeQuery();
            while (resultado.next()){
                lista.add(new Categoria ( resultado.getInt("codigoCategoria"),
                                resultado.getString("nombreCategoria"),
                                resultado.getString("descripcionCategoria")));
            }
                    
        }catch(Exception e){
            e.printStackTrace();
        }
        return listaCategoria = FXCollections.observableArrayList(lista);
    }
    
    public void desactivarControles(){
        txtCodigoCategoria.setEditable(false);
        txtNombreCategoria.setEditable(false);
        txtDescripcionCategoria.setEditable(false);
    }
    
    public void activarControles(){
        txtCodigoCategoria.setEditable(false);
        txtNombreCategoria.setEditable(true);
        txtDescripcionCategoria.setEditable(true);
        
    }
    
    public void limpiarControles(){
        txtCodigoCategoria.clear();
        txtNombreCategoria.clear();
        txtDescripcionCategoria.clear();
        tblCategorias.getSelectionModel().clearSelection();
        
    }

    public Principal getEscenarioPrincipal() {
        return escenarioPrincipal;
    }

    public void setEscenarioPrincipal(Principal escenarioPrincipal) {
        this.escenarioPrincipal = escenarioPrincipal;
    }
    
    
    
}
