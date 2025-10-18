import { StyleSheet, Text, View, Image } from "react-native";
import { useRouter } from "expo-router"; 
import { useEffect } from "react"; 

const Colors = {
    FundoEscuro: "#000000",      
    DestaqueFIAP: "#F23064",   
};

export default function Index() {
    const router = useRouter(); 

    
    useEffect(() => {
        const timer = setTimeout(() => {
            // [CORREÇÃO 1] Usa '/login' para corresponder ao nome do arquivo (ex: app/login.tsx)
            router.replace("/login"); 
        }, 1000); 

        return () => clearTimeout(timer);
    }, []); 

    return (
        <View style={Styles.container}>
            
            <Image
                // [CORREÇÃO 2] Usa require() diretamente na source, conforme o modelo
                source={require("../assets/images/MaskGrup.png")} 
                style={Styles.logo}
            />
            
            <Text style={Styles.text}>Fiap Connect</Text>
            
        </View>
    );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.FundoEscuro, 
        justifyContent: "center", 
        alignItems: "center",
    },
    logo: {
        width: 400, 
        height: 300,
        marginBottom: 0, 
    },
    text: {
        color: Colors.DestaqueFIAP, 
        fontSize: 60, 
        fontWeight: "600",
        marginTop: -50,
        marginLeft: -20,
    },
});