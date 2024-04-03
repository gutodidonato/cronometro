import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { useState } from "react";

export default function App() {
  let ss = 0;
  let mm = 0;
  let hh = 0;

  let timer = true;
  const [tempo, setTempo] = useState(`${hh}:${mm}:${ss}`);
  const [tempoGravado, setTempoGravado] = useState("");
  const [texto, setTexto] = useState("Iniciar");

  function contador() {
    if (timer) {
      const tempo = setInterval(contador, 1000);
      ss += 1;
      if (ss >= 60) {
        ss = 0;
        mm += 1;
        if (mm >= 60) {
          mm = 0;
          hh += 1;
        }
      }
      setTempo(`${hh}:${mm}:${ss}`);
    } else {
      clearInterval(tempo);
    }
  }

  function iniciarContagem() {
    if (texto == "Iniciar") {
      setTexto("Pausar");
      timer = true;
      contador();
    } else {
      setTexto("Iniciar");
      timer != timer;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("./src/crono.png")} />
      <StatusBar style="auto" />
      <Text style={styles.numero}>{tempo}</Text>

      <View style={styles.selecao}>
        <TouchableOpacity style={styles.botao} onPress={iniciarContagem}>
          <Text style={styles.botaoTexto}>{texto}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao}>
          <Text style={styles.botaoTexto}>Reiniciar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao}>
          <Text style={styles.botaoTexto}>Acumular</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={{ fontSize: 20, marginTop: 30, color: "white" }}>
          {tempoGravado}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15065c",
    alignItems: "center",
    justifyContent: "center",
  },
  numero: {
    color: "#fff",
    fontSize: 36,
    position: "absolute",
    top: 370,
  },
  selecao: {
    display: "flex",
    flexDirection: "row",
    width: "80%",
    gap: 30,
    justifyContent: "center",
    marginTop: 40,
  },
  botao: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  botaoTexto: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#15065",
    fontSize: 15,
  },
});
