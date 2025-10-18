import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';

// [IMPORTS CORRIGIDOS E NECESSÁRIOS]
import PerfilIcon from '../assets/images/perfil.png'; 
import ViaMobilityLogo from '../assets/images/ViaMobility.jpg';
import ConexaoAnjoLogo from '../assets/images/ConexãoAnjo.png'; 
import GruposIcon from '../assets/images/MaskGrup.png'; 
import ChatIcon from '../assets/images/mensagem.png'; 
import LinkedInIcon from '../assets/images/link.png'; 
import GitLogo from '../assets/images/git.png'; 
import OracleLogo from '../assets/images/Oracle.png'; 

// Paleta de Cores da FIAP
const Colors = {
    FundoEscuro: '#000000',
    DestaqueFIAP: '#F23064', 
    TextoClaro: '#FFFFFF',
    TextoNeutro: '#8C8C8C',
    CardFundo: '#1A1A1A', 
    TagDefault: '#333333',
};

// --- SIMULAÇÃO DE DADOS GLOBAIS ---
const allFilterSkills = [
    "Mobile Application Development", "Java Advanced", "Non-Relational Database", 
    "Development with .NET", "DevOps Tools e Cloud Computing", "Liderança de Grupo",
    "Disruptive Architectures IoT, IOB e Generative IA", "Compliance, Quality Assurance e Tests",
];
const allStatus = ["Disponível", "Lider", "Grupo", "Membros"];

// [TIPAGEM] Interface para o componente ResultCard
interface ResultCardProps {
    title: string;
    description: string;
    logoSource: any;
    isGroup: boolean;
    onPress: () => void;
}

// --- Componente de Cartão de Resultado (Aluno ou Grupo) ---
// Note: Este componente utiliza a constante 'styles', que é definida abaixo
const ResultCard: React.FC<ResultCardProps> = ({ title, description, logoSource, isGroup, onPress }) => (
    <TouchableOpacity style={styles.resultCard} onPress={onPress}>
        <View style={styles.logoContainer}>
            <Image 
                source={logoSource} 
                style={styles.resultLogo} 
                borderRadius={isGroup ? 8 : 25}
                resizeMode="contain" 
            />
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardDescription} numberOfLines={2}>{description}</Text>
        </View>
    </TouchableOpacity>
);

// -----------------------------------------------------
// --- COMPONENTE PRINCIPAL (SearchPage) ---
// -----------------------------------------------------
export default function SearchPage() {
    const router = useRouter(); 
    
    // [ESTADO] Filtros e Lógica de Dropdown
    const [selectedSkills, setSelectedSkills] = useState(new Set<string>());
    const [selectedStatus, setSelectedStatus] = useState(new Set<string>());
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false); // CHAVE DO DROPDOWN

    const goBack = () => {
        router.replace('/dashboard'); 
    };
    
    // [LÓGICA] Alternar a seleção da skill/status (Toggle)
    const toggleSelection = (set: Set<string>, item: string, setFunction: React.Dispatch<React.SetStateAction<Set<string>>>) => {
        const newSet = new Set(set);
        if (newSet.has(item)) {
            newSet.delete(item);
        } else {
            newSet.add(item);
        }
        setFunction(newSet);
    };

    // [LÓGICA] Ação de Clique no Cartão (Navegação)
    const handleCardPress = (id: string, isGroup: boolean) => {
        if (isGroup && id === 'conexao_anjo') {
            router.push('/group-details/conexao-anjo'); 
        } else if (!isGroup) {
            router.push(`/profile-view/${id}`);
        } else {
            console.log(`Grupo ou Aluno ${id} selecionado.`);
        }
    };
    
    // SIMULAÇÃO DE RESULTADOS
    const searchResults = [
        { id: 'fiap_connect_group', title: 'Fiap Connect', description: 'Descrição: Este projeto é desenvolvido para uma...', logo: GruposIcon, isGroup: true },
        { id: 'conexao_anjo', title: 'Conexão Anjo', description: 'Descrição: Aplicativo mobile desenvolvido pelo...', logo: ConexaoAnjoLogo, isGroup: true, isSpecial: true },
        { id: 'via_mobility', title: 'ViaMobility', description: 'Descrição: O ViaMobility é um aplicativo criado...', logo: ViaMobilityLogo, isGroup: true },
        { id: 'cleiton_souza', title: 'Cleiton de Souza', description: 'Descrição: Sou aluno da Fiap a um ano e meio...', logo: PerfilIcon, isGroup: false },
        { id: 'hyoran_souza', title: 'Hyoran Souza', description: 'Descrição: Minha maior praticidade é no desing...', logo: PerfilIcon, isGroup: false },
        { id: 'miguel_cimino', title: 'Miguel Cimino', description: 'Descrição: Caso esteja procurando um pessoa...', logo: PerfilIcon, isGroup: false },
    ];


    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                
                {/* Botão Voltar e Navegação para Perfil (TOPO) */}
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.backButton} onPress={goBack}>
                        <Text style={styles.backText}>{'< Voltar'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.profileButton} onPress={() => router.push('/profile')}>
                         <Image source={PerfilIcon} style={styles.profileIcon} resizeMode="contain" />
                    </TouchableOpacity>
                </View>

                {/* Header Título */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Fiap Connect</Text>
                </View>

                {/* CAMPO DE BUSCA E FILTRO */}
                <View style={styles.searchBarContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Turma/Curso"
                        placeholderTextColor={Colors.TextoNeutro}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    
                    <TouchableOpacity style={styles.filterIconContainer} onPress={() => setShowFilters(!showFilters)}>
                         <Text style={styles.filterIcon}>⚙️</Text> 
                    </TouchableOpacity>
                </View>

                {/*  FILTROS DE TAGS  */}
                {showFilters && ( 
                    <View style={styles.filterSection}>
                        <Text style={styles.filterTitle}>Filtro</Text>

                        {/* Linha de Tags de Habilidades */}
                        <Text style={styles.filterSubtitle}>Tags de Skills:</Text>
                        <View style={styles.tagsContainer}>
                            {allFilterSkills.map(skill => (
                                <TouchableOpacity
                                    key={skill}
                                    style={[styles.skillTag, selectedSkills.has(skill) && styles.skillTagSelected]}
                                    onPress={() => toggleSelection(selectedSkills, skill, setSelectedSkills)}
                                >
                                    <Text style={styles.skillText}>{skill}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Linha de Status */}
                        <Text style={[styles.filterSubtitle, { marginTop: 15 }]}>Status:</Text>
                        <View style={styles.tagsContainer}>
                            {allStatus.map(status => (
                                <TouchableOpacity
                                    key={status}
                                    style={[styles.skillTag, selectedStatus.has(status) && styles.skillTagSelected]}
                                    onPress={() => toggleSelection(selectedStatus, status, setSelectedStatus)}
                                >
                                    <Text style={styles.skillText}>{status}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}

                {/* LISTA DE RESULTADOS */}
                <View style={styles.resultsList}>
                    {searchResults.map((item) => (
                         <ResultCard
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            logoSource={item.logo}
                            isGroup={item.isGroup}
                            onPress={() => handleCardPress(item.id, item.isGroup)} 
                         />
                    ))}
                </View>
                
                <View style={{ height: 100 }} />
                
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


// SEÇÃO DE ESTILOS

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.FundoEscuro,
    },
    container: { 
        flex: 1,
        backgroundColor: Colors.FundoEscuro,
    },
    
    // Top Bar (Voltar e Perfil)
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    backButton: {
        paddingVertical: 10,
    },
    backText: {
        color: Colors.TextoClaro,
        fontSize: 16,
        fontWeight: '600',
    },
    profileButton: {
        padding: 30,
    },
    profileIcon: {
        width: 30,
        height: 30,
        tintColor: Colors.DestaqueFIAP,
    },

    // --- Header Título ---
    header: {
        paddingHorizontal: 30,
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.TextoClaro,
    },

    // --- Search Bar ---
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 50,
        backgroundColor: Colors.CardFundo,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.DestaqueFIAP,
        height: 50,
    },
    searchInput: {
        flex: 1,
        color: Colors.TextoClaro,
        paddingHorizontal: 20,
        fontSize:15,
    },
    filterIconContainer: {
        backgroundColor: Colors.DestaqueFIAP,
        height: '100%',
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },
    filterIcon: {
        fontSize: 20,
        color: Colors.TextoClaro,
    },

    // --- Filtros (Dropdown) ---
    filterSection: {
        marginHorizontal: 20,
        padding: 20,
        backgroundColor: Colors.CardFundo,
        borderRadius: 10,
        marginBottom: 20,
    },
    filterTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.TextoClaro,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderColor: Colors.TextoNeutro + '30',
        paddingBottom: 5,
    },
    filterSubtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.DestaqueFIAP,
        marginBottom: 5,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    skillTag: {
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 8,
        marginBottom: 8,
        borderWidth: 1.5,
        backgroundColor: Colors.TagDefault,
        borderColor: Colors.TagDefault,
    },
    skillTagSelected: {
        backgroundColor: Colors.DestaqueFIAP,
        borderColor: Colors.DestaqueFIAP,
    },
    skillText: {
        color: Colors.TextoClaro,
        fontSize: 12,
        fontWeight: '600',
    },

    // --- Lista de Resultados ---
    resultsList: {
        marginHorizontal: 20,
    },
    resultCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.CardFundo,
        padding: 20,
        borderRadius: 20,
        marginBottom: 30,
        borderLeftWidth: 3,
        borderColor: Colors.TextoNeutro,
    },
    logoContainer: {
        marginRight: 15,
    },
    resultLogo: {
        width: 60,
        height: 60,
    },
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.TextoClaro,
        marginBottom: 2,
    },
    cardDescription: {
        fontSize: 13,
        color: Colors.TextoNeutro,
    },

    // --- Rodapé ---
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
        width: 50,
        height: 50,
        tintColor: Colors.DestaqueFIAP,
    },
});