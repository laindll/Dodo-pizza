import React from 'react'

interface VerificationTemplateProps {
	code: string
}

export const VerificationTemplate: React.FC<
	Readonly<VerificationTemplateProps>
> = ({ code }) => (
	<div>
		<p>
			Код подтверждения: <h2>{code}</h2>
		</p>

		<p>
			<a href={`http://localhost:3000/api/auth/verify?code=${code}`}>
				Подтвердить регистрацию
			</a>
		</p>
	</div>
)
