import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';

// NOTA: As importações de imagem foram removidas e serão tratadas com require() no corpo.

// Paleta de Cores da FIAP
const Colors = {
    FundoEscuro: '#000000',
    DestaqueFIAP: '#F23064', 
    TextoClaro: '#FFFFFF',
    TextoNeutro: '#8C8C8C',
    CardFundo: '#1A1A1A', 
    InputFundo: 'rgba(255, 255, 255, 0.1)',
};

// --- Componente de Campo Editável (Input) ---
interface EditableInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric';
    showToggle?: boolean;
}
const EditableInput: React.FC<EditableInputProps> = ({ label, value, onChangeText, secureTextEntry, keyboardType, showToggle }) => {
    const [isSecure, setIsSecure] = useState(secureTextEntry);

    return (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={isSecure}
                    keyboardType={keyboardType}
                    placeholderTextColor={Colors.TextoNeutro}
                />
                {/* Botão de Esconder/Mostrar Senha */}
                {showToggle && (
                    <TouchableOpacity onPress={() => setIsSecure(!isSecure)} style={styles.toggleButton}>
                        <Text style={{color: Colors.DestaqueFIAP, fontSize: 16}}>
                            {isSecure ? '👁️' : '🔒'}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

// --- Componente Principal da Página ---
export default function AccountSettingsPage() {
    const router = useRouter(); 
    
    // 1. [EDITÁVEL] Estados para controle dos campos
    const [name, setName] = useState('Gabriel Gonçalves');
    const [email, setEmail] = useState('RM561029@fiap.com');
    const [phone, setPhone] = useState('(11) 99876-5432');
    const [password, setPassword] = useState('••••••••');
    
    // 2. [PRIVACIDADE] Estados para controle da visibilidade (Checkbox)
    const [showEmail, setShowEmail] = useState(false);
    const [showPhone, setShowPhone] = useState(false);

    // [CORREÇÃO 1] Função de Voltar para a página de Perfil
    const goBack = () => {
        // Assume que a rota de perfil é /profilepage
        router.replace('/profilepage');
    };
    
    // Função de Salvar (Apenas simulação)
    const handleSave = () => {
        alert('Configurações salvas com sucesso!');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                
                {/* Botão Voltar */}
                <TouchableOpacity style={styles.backButton} onPress={goBack}>
                    <Text style={styles.backText}>{'< Voltar'}</Text>
                </TouchableOpacity>

                <Text style={styles.pageTitle}>Configurações da Conta</Text>

                {/* Seção de Foto e Edição (COM REQUIRE) */}
                <View style={styles.photoSection}>
                    {/* Borda Magenta na Foto */}
                    <View style={styles.profileImageBorder}>
                        {/* [AJUSTE 2] Usando require() para a foto de perfil */}
                        <Image source={require('../assets/images/eu2.jpg')} style={styles.profileImage} />
                    </View>
                </View>
                
                {/* Seção 1: Dados Pessoais e Login */}
                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Dados de Acesso</Text>
                    
                    <EditableInput label="Nome Completo" value={name} onChangeText={setName} />
                    <EditableInput label="E-mail Institucional" value={email} onChangeText={setEmail} keyboardType="email-address" />
                    
                    <EditableInput 
                        label="Alterar Senha" 
                        value={password} 
                        onChangeText={setPassword} 
                        secureTextEntry={true} 
                        showToggle={true} // Ativa o botão de mostrar/esconder
                    />
                </View>

                {/* Seção 2: Visualização de Contato (Privacidade) */}
                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Visualização de Contato</Text>
                    <Text style={styles.sectionSubtitle}>Controle quais dados são visíveis após um Match Mútuo.</Text>

                    {/* Checkbox 1: E-mail */}
                    <TouchableOpacity style={styles.privacyOption} onPress={() => setShowEmail(!showEmail)}>
                        <View style={[styles.checkbox, showEmail && styles.checkboxActive]} />
                        <Text style={styles.privacyText}>Tornar E-mail visível para o grupo</Text>
                    </TouchableOpacity>

                    {/* Checkbox 2: Telefone */}
                    <EditableInput label="Telefone/WhatsApp" value={phone} onChangeText={setPhone} keyboardType="numeric" />
                    <TouchableOpacity style={styles.privacyOption} onPress={() => setShowPhone(!showPhone)}>
                        <View style={[styles.checkbox, showPhone && styles.checkboxActive]} />
                        <Text style={styles.privacyText}>Tornar Telefone visível para o grupo</Text>
                    </TouchableOpacity>
                </View>

                {/* Botão de Salvar */}
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>SALVAR ALTERAÇÕES</Text>
                </TouchableOpacity>
                
                <View style={{ height: 50 }} />
                
            </ScrollView>
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
        paddingHorizontal: 20,

    },

    backButton: {
        paddingVertical: 10,
        marginBottom: 10,

    },

    backText: {
        color: Colors.TextoClaro,
        fontSize: 16,
        fontWeight: '600',

    },

    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.TextoClaro,
        marginBottom: 30,
        textAlign: 'center',

    },



    // --- Seção de Foto ---

    photoSection: {
        alignItems: 'center',
        marginBottom: 40,
        

    },

    profileImageBorder: {
        borderRadius: 70,
        borderWidth: 3,
        padding: 4,
        marginBottom: 15,

    },

    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,

    },

    editPhotoButton: {

        paddingVertical: 8,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: Colors.TextoNeutro,
        borderRadius: 20,

    },

    editPhotoText: {

        color: Colors.TextoNeutro,
        fontSize: 14,

    },



    // --- Seção de Formulário ---

    sectionCard: {

        backgroundColor: Colors.CardFundo,
        padding: 20,
        borderRadius: 10,
        marginBottom: 5,

    },

    sectionTitle: {

        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.DestaqueFIAP,
        marginBottom: 15,

    },

    sectionSubtitle: {

        fontSize: 14,
        color: Colors.TextoNeutro,
        marginBottom: 20,

    },

    inputGroup: {

        marginBottom: 15,

    },

    label: {

        fontSize: 14,
        color: Colors.TextoClaro,
        marginBottom: 5,

    },

    inputWrapper: {

        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.InputFundo,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.TextoNeutro + '40',
        height: 50,

    },

    input: {

        color: Colors.TextoClaro,

        paddingHorizontal: 15,
        fontSize: 16,
        flex: 1,

    },

    toggleButton: {

        padding: 10,

    },

   

    // --- Checkbox e Privacidade ---

    privacyOption: {

        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,

    },

    privacyText: {

        color: Colors.TextoNeutro,
        fontSize: 14,
        marginLeft: 10,

    },

    checkbox: {

        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: Colors.TextoNeutro,

    },

    checkboxActive: {

        backgroundColor: Colors.DestaqueFIAP,
        borderColor: Colors.DestaqueFIAP,

    },

   

    // --- Botão Salvar ---

    saveButton: {

        backgroundColor: Colors.DestaqueFIAP,
        borderRadius: 8,
        padding: 18,
        alignItems: 'center',
        marginTop: 5,
        marginHorizontal: 20,

    },

    saveButtonText: {

        color: Colors.TextoClaro,
        fontSize: 18,
        fontWeight: 'bold',

    },

}); 