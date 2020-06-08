export default function InputForm({ field, type, value, onChange }) {
	switch(type) {
		default: return(
			<div className="form-group">
				<input 
					className		= "form-control" 
					type 				= { type } 
					name 				= { field } 
					value 			= { value }
					onChange 		= { onChange } 
					placeholder = { 'Type your ' + field } 
				/>
			</div>
		)
	}
}