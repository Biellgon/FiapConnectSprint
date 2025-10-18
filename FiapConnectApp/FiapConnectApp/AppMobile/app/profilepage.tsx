import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router'; 
import React from 'react';


// Paleta de Cores da FIAP
const Colors = {
    FundoEscuro: '#000000',
    DestaqueFIAP: '#F23064', 
    TextoClaro: '#FFFFFF',
    TextoNeutro: '#8C8C8C',
    CardFundo: '#1A1A1A', 
};

// --- Componente Reutilizável de Item de Menu ---
interface MenuItemProps {
    iconSource: any;
    title: string;
    onPress: () => void;
}
const MenuItem: React.FC<MenuItemProps> = ({ iconSource, title, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <Image source={iconSource} style={styles.menuIcon} resizeMode="contain" />
        <Text style={styles.menuText}>{title}</Text>
    </TouchableOpacity>
);

// --- Componente Principal da Página ---

export default function ProfilePage() {
    const router = useRouter(); 

    const userName = "Gabriel Gonçalves";
    const userEmail = "RM561029@fiap.com";

    // [FUNÇÃO DE NAVEGAÇÃO CENTRAL]
    const handleNavigation = (destination: string) => {
        router.push(`/${destination}`); 
    };

    // Lógica de Voltar
    const goBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
             router.replace('/dashboard'); 
        }
    };


    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                
                {/* Botão Voltar */}
                <TouchableOpacity style={styles.backButton} onPress={goBack}>
                    <Text style={styles.backText}>{'< Voltar'}</Text>
                </TouchableOpacity>

                {/* Bloco do Perfil (Cartão de Destaque) */}
                <View style={styles.profileCard}> 
                    
                    {/* Foto de Perfil */}
                    <View style={styles.profileImageContainer}>
                        {/* [AJUSTE IMAGEM] require() para foto */}
                        <Image source={require('../assets/images/eu2.jpg')} style={styles.profileImage} />
                        <TouchableOpacity style={styles.cameraIconContainer}>
                            {/* [AJUSTE IMAGEM] require() para ícone da câmera */}
                            <Image source={require('../assets/images/camera.png')} style={styles.cameraIcon} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>

                    {/* Dados Básicos */}
                    <Text style={styles.userName}>{userName}</Text>
                    <Text style={styles.userEmail}>{userEmail}</Text>

                    {/* Divisor Vermelho */}
                    <View style={styles.divider} />

                    {/* Menu de Opções */}
                    
                    {/* [BOTÃO CORRIGIDO 1] Item 1: Conta -> accountsettingspage */}
                    <MenuItem 
                        iconSource={require('../assets/images/perfil.png')} 
                        title="Conta" 
                        onPress={() => handleNavigation('accountsettingspage')} 
                    />
                    
                    {/* [BOTÃO CORRIGIDO 2] Item 2: Competências -> skillssetuppage */}
                    <MenuItem 
                        iconSource={require('../assets/images/compentencias.png')} 
                        title="Competências para o Matchmaking" 
                        onPress={() => handleNavigation('skillssetuppage')} 
                    />
                    
                    {/* Item 3: Histórico e Configurações */}
                    <MenuItem 
                        iconSource={require('../assets/images/historico.png')} 
                        title="Histórico e Outras Configurações" 
                      onPress={() => handleNavigation('history-settings')} 
                    />
                </View>
                
                {/* Espaçador final */}
                <View style={{ height: 100 }} />

            </ScrollView>

            {/* Rodapé de Logos (Fixo) */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Connect Fiap</Text>
                {/* [AJUSTE IMAGEM] require() para os logos */}
                <Image source={require('../assets/images/link.png')} style={styles.footerIcon} resizeMode="contain" />
                <Image source={require('../assets/images/Oracle.png')} style={styles.footerIcon} resizeMode="contain" />
                <Image source={require('../assets/images/git.png')} style={styles.footerIcon} resizeMode="contain" />
                <Text style={styles.footerText}>FIAP</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.FundoEscuro,
    },
    container: { 
        flex: 1,
        backgroundColor: Colors.FundoEscuro,
        paddingTop: 10,
    },
    
    // --- Botão Voltar (Com mais espaço) ---
    backButton: {
        paddingHorizontal: 20, 
        paddingVertical: 10,
        marginBottom: 10, 
    },
    backText: {
        color: Colors.TextoClaro,
        fontSize: 16,
        fontWeight: '600',
    },

    // --- Bloco do Perfil (Cartão principal com mais espaço) ---
    profileCard: {
        backgroundColor: Colors.CardFundo,
        marginHorizontal: 20,
        borderRadius: 15,
        padding: 20, // AUMENTADO: Mais espaço interno
        alignItems: 'center',
        marginBottom: 10, 
    },
    profileImageContainer: {
        marginBottom: 5,
        alignItems: 'center',
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 5,
    },
    cameraIconContainer: {
    position: 'absolute',
    bottom: 60, // Puxa para mais perto da borda
    right: 5,  // Puxa para mais perto da borda
    backgroundColor: Colors.DestaqueFIAP,
    borderRadius: 30,
    // Remova o padding e defina um tamanho fixo:
    width: 35, 
    height: 35,
    justifyContent: 'center', // Centraliza o ícone
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.TextoClaro,
    },
    cameraIcon: {
        width: 18,
        height: 18,
        bottom: 40,
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.TextoClaro,
    },
    userEmail: {
        fontSize: 14,
        color: Colors.TextoNeutro,
        marginBottom: 10,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.DestaqueFIAP,
        width: '90%',
        marginVertical: 25, // AUMENTADO: Separa o nome do menu
    },

    // --- Itens de Menu (Mais separados) ---
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 50, // AUMENTADO: Mais espaço entre os itens
        borderBottomWidth: 0.5,
        borderColor: Colors.TextoNeutro + '30',
    },
    menuIcon: {
        width: 30,
        height: 30,
        marginRight: 15,
        tintColor: Colors.DestaqueFIAP,
    },
    menuText: {
        fontSize: 20,
        color: Colors.TextoClaro,
        fontWeight: '600',
    },

    // --- Rodapé de Logos ---
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: Colors.FundoEscuro,
        borderTopWidth: 1,
        borderColor: Colors.DestaqueFIAP,
    },
    footerIcon: {
        width: 25,
        height: 25,
        tintColor: Colors.DestaqueFIAP, 
    },
    footerText: {
        color: Colors.TextoNeutro,
        fontSize: 12,
    },
});