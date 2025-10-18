import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';

// [IMPORTAÇÃO DE IMAGENS] - Ajuste os caminhos se necessário
import AnjoLogo from '../assets/images/Anjo.png'; 
import LearningIcon from '../assets/images/Learning.png'; // Ícone de Habilidades Desejadas
import LinkedInIcon from '../assets/images/link.png'; 
import OracleLogo from '../assets/images/Oracle.png'; 
import GitLogo from '../assets/images/git.png'; 

// Paleta de Cores da FIAP
const Colors = {
    FundoEscuro: '#000000',
    DestaqueFIAP: '#F23064', 
    TextoClaro: '#FFFFFF',
    TextoNeutro: '#8C8C8C',
    CardFundo: '#1A1A1A', 
    CardBorda: '#C8102E', // Um tom de vermelho/magenta mais escuro para a borda
};

// --- Componente de Tags de Habilidades ---
const SkillTag = ({ text }) => (
    <View style={styles.skillTag}>
        <Text style={styles.skillText}>{text}</Text>
    </View>
);

// --- Componente Principal da Página ---
export default function GroupDetailsPage() {
    const router = useRouter(); 
    
    // Dados Fixos do Grupo (Conexão Anjo)
    const groupData = {
        name: "Conexão Anjo",
        members: "Carlos Clementino e Arthur Ribeiro Algafe",
        status: "Buscando Membros (1 vaga)",
        description: "Aplicativo mobile desenvolvido pelo Grupo ARC para conectar pessoas afetadas por desastres naturais, enchentes, deslizamentos, queimadas a pontos de apoio, doadores e serviços essenciais. Focado em agilidade, acessibilidade e inclusão digital, o app oferece mapeamento de doações, conexão direta com voluntários, busca filtrada de recursos e atualizações em tempo real. Uma solução que une tecnologia e empatia para fortalecer a resposta humanitária em situações de crise.",
        requiredSkills: ["Java Advanced", "DevOps Tools e Cloud Computing", "Mobile Application Development"],
    };

    /* Lógica para Voltar (Volta para a página anterior, ou para a Busca se falhar)
    const goBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
              Retorna para a página de Busca se não houver histórico
             router.replace('/search'); 
       }
    };
    */
    /*
    const handleJoin = () => {
        // Lógica de candidatura (ex: enviar notificação ao líder)
        alert(`Candidatura enviada para o grupo ${groupData.name}!`);
        // Opcional: Voltar para a página de Busca
        router.replace('/search');
    };
    */
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                
                {/* Botão Voltar */}
                <TouchableOpacity style={styles.backButton} onPress={goBack}>
                    <Text style={styles.backText}>{'< Voltar'}</Text>
                </TouchableOpacity>

                {/* Bloco de Informações Principais */}
                <View style={styles.infoBlock}>
                    <Image source={AnjoLogo} style={styles.groupLogo} resizeMode="contain" />
                    <View style={styles.textInfo}>
                        <Text style={styles.groupName}>{groupData.name}</Text>
                        <Text style={styles.memberList}>Integrantes: {groupData.members}</Text>
                        <Text style={styles.statusText}>Status Atual: {groupData.status}</Text>
                    </View>
                </View>

                {/* Seção 1: Descrição */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Descrição</Text>
                    
                    {/* Descrição com Borda Curva */}
                    <View style={styles.descriptionBox}>
                        <Text style={styles.descriptionText}>{groupData.description}</Text>
                    </View>
                </View>

                {/* Seção 2: Habilidades Desejadas */}
                <View style={styles.section}>
                    <View style={styles.skillsHeader}>
                        <Image source={LearningIcon} style={styles.skillsIcon} resizeMode="contain" />
                        <Text style={styles.skillsTitle}>Habilidades Desejadas</Text>
                    </View>
                    
                    {/* Tags de Habilidades */}
                    <View style={styles.skillsContainer}>
                        {groupData.requiredSkills.map(skill => (
                            <SkillTag key={skill} text={skill} />
                        ))}
                    </View>
                </View>

                {/* Bloco de Ação (Entre Já!) */}
                <View style={styles.actionBlock}>
                    <Text style={styles.actionTitle}>Entre Já!</Text>
                    <TouchableOpacity style={styles.joinButton} onPress={handleJoin}>
                        <Text style={styles.joinButtonText}>Venha participar do {groupData.name}</Text>
                    </TouchableOpacity>
                </View>
                
                {/* Espaçador final */}
                <View style={{ height: 40 }} />
                
            </ScrollView>

            {/* Rodapé de Logos (Fixo) */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Connect Fiap</Text>
                <Image source={LinkedInIcon} style={styles.footerIcon} resizeMode="contain" />
                <Image source={OracleLogo} style={styles.footerIcon} resizeMode="contain" />
                <Image source={GitLogo} style={styles.footerIcon} resizeMode="contain" />
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
    },
    
    // --- Botão Voltar ---
    backButton: {
        padding: 50,
    },
    backText: {
        color: Colors.TextoClaro,
        fontSize: 20,
        fontWeight: '600',
    },

    // --- Bloco de Informações Principais ---
    infoBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 70,
    },
    groupLogo: {
        width: 200,
        height: 200,
        borderRadius: 20,
        marginRight: 15,
    },
    textInfo: {
        justifyContent: 'center',
    },
    groupName: {
        fontSize: 40,
        fontWeight: 'bold',
        color: Colors.TextoClaro,
    },
    memberList: {
        fontSize: 20,
        color: Colors.TextoNeutro,
    },
    statusText: {
        fontSize: 20,
        color: Colors.TextoNeutro,
        fontWeight: 'bold',
        marginTop: 5,
    },

    // --- Seção (Descricao / Habilidades) ---
    section: {
        paddingHorizontal: 70,
        marginBottom:50,
    },
    sectionTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: Colors.TextoClaro,
        borderColor: Colors.DestaqueFIAP,
        paddingBottom: 10,
        marginBottom: 15,
    },

    // Descrição com Borda Curva
    descriptionBox: {
        padding: 20,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: Colors.CardBorda, 
    },
    descriptionText: {
        fontSize: 20,
        color: Colors.TextoClaro,
        lineHeight: 25,
    },

    // --- Habilidades ---
    skillsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: Colors.DestaqueFIAP,
        paddingBottom: 10,
        marginBottom: 15,
    },
    skillsIcon: {
        width: 45,
        height: 45,
        borderRadius: 20,
        marginRight: 15,
        tintColor: Colors.DestaqueFIAP,
    },
    skillsTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.TextoClaro,
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    skillTag: {
        backgroundColor: Colors.DestaqueFIAP,
        borderRadius: 15,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 10,
        marginBottom: 10,
    },
    skillText: {
        color: Colors.TextoClaro,
        fontSize: 12,
        fontWeight: 'bold',
    },

    // --- Bloco de Ação ---
    actionBlock: {
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 40,
    },
    actionTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        color: Colors.TextoClaro,
        marginBottom: 20,
    },
    joinButton: {
        backgroundColor: Colors.DestaqueFIAP,
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 40,
    },
    joinButtonText: {
        color: Colors.TextoClaro,
        fontSize: 18,
        fontWeight: 'bold',
    },
    
    // --- Rodapé de Logos ---
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: Colors.FundoEscuro,
        borderTopWidth: 1,
        borderColor: Colors.DestaqueFIAP,
    },
    footerText: {
        color: Colors.TextoNeutro,
        fontSize: 12,
    },
    footerIcon: {
        width: 25,
        height: 25,
        tintColor: Colors.DestaqueFIAP, 
    },
});