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

let timer = false;
let temporizador: NodeJS.Timeout | undefined;
let ss = 0;
let mm = 0;
let hh = 0;

export default function App() {
  const [tempo, setTempo] = useState("00:00:00");
  const [tempoGravado, setTempoGravado] = useState("");
  const [texto, setTexto] = useState("Iniciar");

  function contador() {
    if (timer) {
      ss++;
      if (ss >= 60) {
        ss = 0;
        mm++;
        if (mm >= 60) {
          hh++;
          mm = 0;
        }
      }
      setTempo(`${hh}:${mm}:${ss}`);
    }
  }

  function iniciarContagem() {
    if (timer) {
      clearInterval(temporizador);
      setTexto("Iniciar");
      timer = false;
    } else {
      temporizador = setInterval(contador, 1000);
      setTexto("Parar");
      timer = true;
    }
  }
  function zerarContador() {
    setTempo("00:00:00");
    ss = 0;
    mm = 0;
    hh = 0;
  }
  function gravarTempo() {
    let tempoAtual = `Ultimo tempo: ${hh}:${mm}:${ss}`;
    setTempoGravado(tempoAtual);
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
          <Text style={styles.botaoTexto} onPress={zerarContador}>
            Reiniciar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao}>
          <Text style={styles.botaoTexto} onPress={gravarTempo}>
            Acumular
          </Text>
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
