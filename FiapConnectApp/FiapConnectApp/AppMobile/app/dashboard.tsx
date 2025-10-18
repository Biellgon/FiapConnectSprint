import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router'; 

const Colors = {
    FundoEscuro: '#000000',
    DestaqueFIAP: '#F23064', 
    TextoClaro: '#FFFFFF',
    TextoNeutro: '#8C8C8C',
    CardFundo: '#1A1A1A', 
};

// [SIMULAÇÃO DE DADOS]
const userName = "Gabriel";
const hasNewInvite = true;
const isGroupFormed = true; 

// --- Componentes Reutilizáveis ---

    // Componente para os cartões de Acesso Rápido (os 2 cards lado a lado)
    const QuickAccessCard = ({ title, subtitle, buttonText, onPress, color }) => (
        <View style={styles.quickCard}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardSubtitle}>{subtitle}</Text>
            <TouchableOpacity 
                style={[styles.cardButton, { backgroundColor: color || Colors.DestaqueFIAP }]}
                onPress={onPress}
            >
                <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
        </View>
    );

// --- Componente Principal (Dashboard) ---

export default function DashboardPage() {
    const router = useRouter(); 
    
    // NOTA: Esta função prefixa a string de destino com '/'
    const handleNavigation = (destination) => {
        console.log(`Navegando para: ${destination}`);
        router.push(`/${destination}`); 
    };

    return (
        <View style={styles.fullContainer}>
            <ScrollView style={styles.contentContainer}>

                {/* 1. HEADER - Área de Boas-Vindas (COM BOTÃO DE PERFIL) */}
                <View style={styles.header}>
                    <Text style={styles.greeting}>Olá, {userName}!</Text>
                    
                    {/* Container para alinhar a Imagem e o Botão de Perfil */}
                    <View style={styles.headerRight}>
                        
                        {/* [BOTÃO 1 CORRIGIDO] Ícone de Perfil no Canto Superior Direito */}
                        <TouchableOpacity 
                            // CORREÇÃO APLICADA: Rota agora é 'profilepage'
                            onPress={() => handleNavigation('profilepage')} 
                            style={styles.profileIconContainer}
                        >
                            <Image 
                                source={require('../assets/images/perfil.png')} 
                                style={styles.profileHeaderIcon} 
                                resizeMode="contain" 
                            />
                        </TouchableOpacity>

                        {/* Imagem grudada na linha inferior (o gráfico/pessoas) */}
                        <Image 
                            source={require('../assets/images/header-dashboard.png')} 
                            style={styles.headerImage} 
                            resizeMode="contain" 
                        />
                    </View>
                </View>

                {/* 2. ACESSO RÁPIDO - Cards Lado a Lado */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Acesso Rápido</Text>
                    <View style={styles.quickAccessRow}>
                        
                        {/* [BOTÃO 2 CORRIGIDO] CARD 1: BUSCAR GRUPO */}
                        <QuickAccessCard
                            title="Procurando um Time?"
                            subtitle="Encontre seu Match Ideal!"
                            buttonText="Começar a Buscar"
                            onPress={() => handleNavigation('searchpage')} 
                            color={Colors.DestaqueFIAP}
                        />

                        {/* CARD 2: CONVITE / STATUS */}
                        <QuickAccessCard
                            title={hasNewInvite ? "Você tem 1 Novo Convite de Grupo!" : "Nenhum Convite Novo"}
                            subtitle={hasNewInvite ? "Não perca tempo!" : "Seja proativo."}
                            buttonText={hasNewInvite ? "Ver Convite" : "Ver Perfil"}
                            // Rota temporária, caso a página de convites não exista
                            onPress={() => handleNavigation(hasNewInvite ? 'invites' : 'profilepage')} 
                            color={hasNewInvite ? Colors.DestaqueFIAP : Colors.TextoNeutro}
                        />
                    </View>
                </View>

                {/* 3. NOTIFICAÇÕES - Card Grande */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Notificações</Text>
                    {isGroupFormed ? (
                        <View style={styles.notificationCard}>
                            <Text style={styles.notificationText}>Parabéns! Seu Grupo está Formado!</Text>
                            <TouchableOpacity 
                                style={styles.notificationButton}
                                onPress={() => handleNavigation('group-details')}
                            >
                                <Text style={styles.buttonText}>Ver Detalhes do Grupo</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <Text style={styles.cardSubtitle}>Nenhuma notificação importante por enquanto.</Text>
                    )}
                </View>
                
                <View style={{ height: 50 }} />
                
            </ScrollView>
            
            {/* 4. TAB BAR - Navegação Inferior */}
            <View style={styles.tabBar}>
                
                {/* TAB 1: GRUPOS/BUSCA */}
                <TouchableOpacity onPress={() => handleNavigation('searchpage')} style={styles.tabItem}>
                    <Image 
                        source={require('../assets/images/MaskGrup.png')} 
                        style={[styles.tabIconImage, { tintColor: Colors.DestaqueFIAP }]} 
                        resizeMode="contain" 
                    />
                </TouchableOpacity>

                {/* TAB 2: CHAT */}
                <TouchableOpacity onPress={() => handleNavigation('chat')} style={styles.tabItem}>
                    <Image 
                        source={require('../assets/images/mensagem.png')} 
                        style={styles.tabIconImage} 
                        resizeMode="contain" 
                    />
                </TouchableOpacity>
                
                {/* TAB 3: PERFIL CORRIGIDO */}
                <TouchableOpacity onPress={() => handleNavigation('profilepage')} style={styles.tabItem}>
                    <Image 
                        source={require('../assets/images/perfil.png')} 
                        style={styles.tabIconImage} 
                        resizeMode="contain" 
                    />
                </TouchableOpacity>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    fullContainer: {
        flex: 1,
        backgroundColor: Colors.FundoEscuro,
    },
    contentContainer: {
        flexGrow: 1,
    },
    
    // --- 1. HEADER ESTILOS ---
    header: {
        backgroundColor: Colors.FundoEscuro, 
        paddingHorizontal: 20, 
        paddingTop: 50,
        paddingBottom: 10, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end', 
        borderBottomWidth: 3, 
        borderColor: Colors.DestaqueFIAP,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        position: 'relative',
    },
    greeting: {
        fontSize: 30, 
        fontWeight: 'bold',
        color: Colors.TextoClaro,
        width: '50%',
        marginBottom: 0, 
    },
    headerImage: {
        width: 150, 
        height: 100,
        marginBottom: -30, 
    },
    profileIconContainer: {
        position: 'absolute',
        top: -20,
        right: 0, 
        padding: 5,
        zIndex: 10,
    },
    profileHeaderIcon: {
        width: 35,
        height: 35,
        tintColor: Colors.DestaqueFIAP,
    },

    // --- SEÇÕES E CARDS ---
    section: {
        padding: 30,
    },
    sectionTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.TextoClaro,
        marginBottom: 30,
    },
    quickAccessRow: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    quickCard: {
        width: '48%', 
        backgroundColor: Colors.CardFundo,
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.DestaqueFIAP + '80',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.TextoClaro,
        marginBottom: 5,
    },
    cardSubtitle: {
        fontSize: 15,
        color: Colors.TextoNeutro,
        marginBottom: 40,
    },
    cardButton: {
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
        marginTop: 30,
    },
    buttonText: {
        color: Colors.TextoClaro,
        fontWeight: 'bold',
    },
    notificationCard: {
        backgroundColor: Colors.CardFundo,
        padding: 30,
        borderRadius: 10,
        borderLeftWidth: 5, 
        borderColor: Colors.DestaqueFIAP,
        alignItems: 'flex-start',
    },
    notificationText: {
        fontSize: 45,
        fontWeight: 'bold',
        color: Colors.TextoClaro,
        marginBottom: 60,
    },
    notificationButton: {
        backgroundColor: Colors.DestaqueFIAP,
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
        width: '100%', 
    },

    // --- 4. TAB BAR ESTILOS ---
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
        backgroundColor: Colors.CardFundo,
        borderTopWidth: 1,
        borderColor: Colors.DestaqueFIAP,
        position: 'absolute', 
        bottom: 0,
        left: 0,
        right: 0,
    },
    tabItem: {
        padding: 5,
    },
    tabIconImage: {
        width: 30,
        height: 30,
    },
});