import {useState} from 'react';
import {Button, Form, Input, message} from 'antd';
import {CheckOutlined, SendOutlined} from '@ant-design/icons';

const EmailVerification = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [codeSent, setCodeSent] = useState(false);

    const sendVerificationCode = async () => {
        try {
            const email = await form.validateFields(['email']);
            setLoading(true);
            // 여기에 실제 이메일 전송 로직을 구현하세요
            setTimeout(() => {
                setLoading(false);
                setCodeSent(true);
                message.success('인증 코드가 이메일로 전송되었습니다.');
            }, 2000);
        } catch (error) {
            console.error('유효성 검사 실패:', error);
        }
    };

    const verifyCode = async (values) => {
        setLoading(true);
        // 여기에 실제 인증 코드 확인 로직을 구현하세요
        setTimeout(() => {
            setLoading(false);
            message.success('이메일이 성공적으로 인증되었습니다!');
        }, 2000);
    };

    return (
        <Form form={form} onFinish={verifyCode} layout="vertical">
            <Form.Item
                name="email"
                label="이메일"
                rules={[
                    {required: true, message: '이메일을 입력해주세요'},
                    {type: 'email', message: '유효한 이메일 주소를 입력해주세요'}
                ]}
            >
                <Input
                    placeholder="your@email.com"
                    suffix={
                        <Button
                            type="link"
                            onClick={sendVerificationCode}
                            icon={<SendOutlined/>}
                            disabled={codeSent}
                        >
                            전송
                        </Button>
                    }
                />
            </Form.Item>

            {codeSent && (
                <Form.Item
                    name="verificationCode"
                    label="인증 코드"
                    rules={[{required: true, message: '인증 코드를 입력해주세요'}]}
                >
                    <Input placeholder="인증 코드 6자리 입력"/>
                </Form.Item>
            )}

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    icon={<CheckOutlined/>}
                    disabled={!codeSent}
                >
                    인증하기
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EmailVerification;